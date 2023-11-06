import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { BaseEditComponent } from 'src/app/views/dashboard/shared/components/base-component/base-edit/base-edit.component';
import { Answer, DraggableQuestion, Question } from '../../quiz';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { QuizService } from 'src/app/core/services/quiz.service';
import { Observable } from 'rxjs';

type TDraggableQuestionAnswerUid = string;

interface IDraggableQuestionAnswer {
  uid: TDraggableQuestionAnswerUid;
  content: string;
}

interface IDraggableQuestion {
  prompt: string;
  selectedAnswerId?: number;
  answers: TDraggableQuestionAnswerUid[];
  default_answer_ids?: string[];
}

@Component({
  selector: 'dashboard-question-draggable-form',
  templateUrl: './draggable-form.component.html',
  styleUrls: ['./draggable-form.component.scss'],
})
export class DraggableFormComponent
  extends BaseEditComponent
  implements OnChanges
{
  @Input() override editInstance: DraggableQuestion | Question | null = null;
  @Input() editQuizInstanceId: number | null = null;
  @Output() onRequestSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    fb: FormBuilder,
    modalService: BsModalService,
    http: HttpClient,
    private quizService: QuizService,
  ) {
    super(fb, modalService, http);
  }

  override ngOnInit(): void {
    this.form = this.fb.group({
      prompt: ['Connect subquestions to answers', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['editInstance']) {
      if (changes['editInstance'].currentValue === null) {
        this.editInstance = null;
        this.form_reset()
        this.form = this.fb.group({
          prompt: ['Connect subquestions to answers', Validators.required],
        });
      } else {
        this.editInstance = changes['editInstance'].currentValue;
        this.form_reset();
        this.form = this.fb.group({
          prompt: ['Connect subquestions to answers', Validators.required],
        });
      }
      this.patchFormValue({});
    }
  }
  override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        prompt: this.editInstance.prompt || 'Connect subquestions to answers',
      });
      const tmp_subquestions: IDraggableQuestion[] = (this.editInstance as any)
        .subquestions
        ? [...(this.editInstance as any).subquestions]
        : [];
      tmp_subquestions.forEach((item) => {
        item.answers = [];
        item.default_answer_ids = (item as any).correct_answers.map(
          (item_default_answer: { id: any; }) => item_default_answer.id,
        );
      });
      this.answers = (this.editInstance as any).answers || [];
      let answer_counter = 0;
      this.answers.forEach((item) => {
        item.uid = `${answer_counter}`;
        tmp_subquestions.forEach((tmp_item) => {
          if (tmp_item.default_answer_ids?.includes((item as any).id)) {
            tmp_item.answers.push(item.uid);
          }
        });
        answer_counter++;
      });
      this.subquestions = tmp_subquestions;
    }
  }
  public answers: IDraggableQuestionAnswer[] = [];
  public subquestions: IDraggableQuestion[] = [];
  addAnswer() {
    const newAnswer: IDraggableQuestionAnswer = {
      uid: `${this.answers.length + 1}`,
      content: '',
    };
    this.answers.push(newAnswer);
  }
  addQuestion() {
    const newQuestion: IDraggableQuestion = { prompt: '', answers: [] };
    this.subquestions.push(newQuestion);
  }
  removeAnswer(answerId: string) {
    this.answers = this.answers.filter(
      (answer) => answer.uid !== `${answerId}`,
    );
    this.subquestions.forEach((question) => {
      if (question.answers.includes(`${answerId}`)) {
        question.answers = question.answers.filter(
          (item) => item !== `${answerId}`,
        );
      }
    });
  }
  removeQuestion(index: number) {
    this.subquestions.splice(index, 1);
  }
  onAnswerSelect($event: string, subquestion: any) {
    subquestion.answers = [`${$event}`];
  }
  protected override fetchCreateRequest(data: any): Observable<any> {
    return this.quizService.addQuestion(this.editQuizInstanceId!, data);
  }
  protected override fetchUpdateRequest(
    id: number,
    data: any,
  ): Observable<any> {
    return this.quizService.updateQuestion(
      this.editQuizInstanceId!,
      this.editInstance!.id,
      data,
    );
  }
  protected override getPreparedEditData(data: any): Object {
    const submit_data = {
      ...data,
      subquestions: this.subquestions.map((question) => ({
        prompt: question.prompt,
        answers: question.answers,
      })),
      answers: this.answers,
      type: 'd',
    };
    return { ...submit_data };
  }
  protected override afterRequestSuccess(item_data: any) {
    this.loading.post = false;
    this.validationErrors = {};
    this.form_reset()
    this.onRequestSuccess.emit(item_data);
  }
  protected override afterRequestError(error: any) {
    this.loading.post = false;
    if (error.status == 400 || error.status == 422) {
      const errors = { ...error.error };
      this.validationErrors = errors;
    }
  }
  private form_reset() {
    this.answers = [];
    this.subquestions = [];
    this.form?.reset();
  }
}
