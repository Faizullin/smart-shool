import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { BaseEditComponent } from 'src/app/views/dashboard/shared/components/base-component/base-edit/base-edit.component';
import { Answer, OpenEndedQuestion, Question, Quiz } from '../../quiz';
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

@Component({
  selector: 'dashboard-question-open-ended-form',
  templateUrl: './open-ended-form.component.html',
  styleUrls: ['./open-ended-form.component.scss'],
})
export class OpenEndedFormComponent
  extends BaseEditComponent
  implements OnChanges
{
  @Input() override editInstance: OpenEndedQuestion | Question | null = null;
  @Input() mode!: 'edit' | 'create';
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
      prompt: new FormControl('', Validators.required),
      answers: this.fb.array([]),
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['editQuizInstanceId'] && !changes['editQuizInstanceId'].firstChange && changes['editInstance']) {
      if (changes['editInstance'].currentValue === null) {
        this.form = this.fb.group({
          prompt: new FormControl('', Validators.required),
          answers: this.fb.array([]),
        });
      } else {
        this.form = this.fb.group({
          prompt: new FormControl('', Validators.required),
          answers: this.fb.array([]),
        });
      }
      this.patchFormValue({});
    }
  }
  override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      const control = this.form.get('answers') as FormArray;
      this.form.patchValue({
        prompt: this.editInstance.prompt,
      });
      while (control.length !== 0) {
        control.removeAt(0);
      }
      (this.editInstance as any).answers.forEach((item: Answer) => {
        control.push(
          this.fb.group({
            content: item.content,
            correct: item.correct,
          }),
        );
      });
    }
  }
  onRemoveQuestionAnswer(answerIndex: number) {
    (this.form.get('answers') as FormArray).removeAt(answerIndex);
  }
  get questionAnswers(): FormArray {
    return this.form.get('answers') as FormArray;
  }
  addAnswer() {
    (<FormArray>this.form.controls['answers']).push(
      this.fb.group({
        content: ['', Validators.required],
        correct: [false],
      }),
    );
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
    for (let index = 0; index < data.answers.length; index++) {
      data.answers[index].correct = Boolean(data.answers[index].correct);
    }
    data.type = 'o';
    return data;
  }
  protected override afterRequestSuccess(item_data: any) {
    this.loading.post = false;
    this.validationErrors = {};
    this.form.reset();
    this.onRequestSuccess.emit(item_data);
  }
  protected override afterRequestError(error: any) {
    this.loading.post = false;
    if (error.status == 400 || error.status == 422) {
      const errors = { ...error.error };
      this.validationErrors = errors;
    }
  }
}
