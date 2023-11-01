import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Exam, Question, Quiz } from 'src/app/core/models/quiz';
import { QuizService } from 'src/app/core/services/quiz.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  FilterParams,
  TableColumn,
} from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FiltersService } from 'src/app/core/services/filters.service';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss'],
})
export class QuizEditComponent extends BaseEditComponent {
  public override action_urls = {
    detail: (id: number) => `/api/s/quizzes/${id}/`,
    post: () => `/api/s/quizzes/`,
  };
  public override editInstance: Quiz | null = null;
  public questionForm!: FormGroup;
  public editQuestionInstance: Question | null = null;
  public multiselectDocumentDropdownSettings: IDropdownSettings = {
    idField: 'id',
    textField: 'title',
    // itemsShowLimit: 3,
    singleSelection: true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: false,
    allowRemoteDataSearch: true,
  };

  public columns: TableColumn<Question>[] = [
    {
      header: 'Id',
      field: 'id',
      cellTemplate: (data: Question) => `<strong>${data.id}</strong>`,
    },
    {
      header: 'Prompt',
      field: 'prompt',
    },
    {
      header: 'Answers Count',
      field: 'answers_count',
      cellTemplate: (data: Question) => `${data.answers_count}`,
    },
    {
      header: 'Created At',
      field: 'created_at',
      cellTemplate: (data: Question) => `${data.created_at}`,
    },
    {
      header: 'Updated At',
      field: 'updated_at',
      cellTemplate: (data: Question) => `${data.updated_at}`,
    },
  ];

  constructor(
    fb: FormBuilder,
    modalService: BsModalService,
    http: HttpClient,
    private quizService: QuizService,
    private filtersService: FiltersService,
  ) {
    super(fb, modalService, http);
  }

  override ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      exam: [[], Validators.required],
      duration_time: [[], Validators.required],
      questions: this.fb.array([new FormControl('')]),
    });
    this.questionForm = this.fb.group({
      prompt: new FormControl('', Validators.required),
      answers: this.fb.array([]),
    });
    super.ngOnInit();
  }
  override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        title: this.editInstance.title,
        exam: this.editInstance.exam ? [this.editInstance.exam] : [],
        duration_time: this.editInstance.duration_time || 0,
        questions: [],
      });
      this.fetchQuizQuestions();
    }
  }
  onEditQuestionOpen(item: Question) {
    if (this.editInstance !== null && item.id !== undefined) {
      this.quizService.getQuestion(this.editInstance.id, item.id).subscribe({
        next: (question_item) => {
          this.editQuestionInstance = question_item;
          this.questionAnswers.clear();
          this.questionForm.patchValue({
            prompt: item.prompt,
          });
          item.answers.map((item) => {
            const form = this.fb.group({
              content: item.content,
              correct: item.correct,
            });
            this.questionAnswers.push(form);
          });
        },
      });
    }
  }
  onDeleteQuestion(item: Question) {
    if (this.editInstance !== null && item.id !== undefined) {
      this.quizService.deleteQuestion(this.editInstance.id, item.id).subscribe({
        next: () => {
          if (this.editQuestionInstance?.id === item.id) {
            this.editQuestionInstance = null;
            this.questionForm.reset();
          }
          this.fetchQuizQuestions();
        },
      });
    }
  }
  onRemoveQuestionAnswer(answerIndex: number) {
    (this.questionForm.get('answers') as FormArray).removeAt(answerIndex);
  }

  public filterParams: FilterParams = {
    page: 1,
    page_size: 10,
    filterText: '',
    ordering: 'id',
  };
  public currentQuestionPage?: number;

  onPageSizeChange(pageSize: number) {
    this.filterParams.page_size = pageSize;
    this.filterParams.page = 1;
    this.fetchQuizQuestions();
  }
  onPageChange(page: number) {
    this.filterParams.page = page;
    this.fetchQuizQuestions();
  }

  getQuestionAnswerForms(): FormArray {
    return this.questionForm.controls['answers'] as FormArray;
  }

  get questionFormControl() {
    return this.questionForm.controls;
  }
  get questionAnswers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }
  getAnswerForm(): FormGroup {
    return this.fb.group({
      content: ['', Validators.required],
      correct: [false],
    });
  }
  addAnswer() {
    (<FormArray>this.questionForm.controls['answers']).push(
      this.getAnswerForm(),
    );
  }
  private fetchQuizQuestions() {
    if (this.editInstance !== null) {
      this.quizService
        .getQuestions(this.editInstance.id, {
          ...this.filterParams,
          search: this.filterParams.filterText,
        })
        .subscribe((data) => {
          this.editInstance!.questions = data.results;
          this.editInstance!.questions_count = data.count;
        });
    }
  }
  override getPreparedEditData(data: any) {
    data.exam_id = data.exam.length > 0 ? data.exam[0].id : null;
    return data;
  }
  public onQuestionSave() {
    if (this.editInstance !== null && (this.questionForm.valid || true)) {
      const data = this.questionForm.value;
      for (let index = 0; index < data.answers.length; index++) {
        data.answers[index].correct = Boolean(data.answers[index].correct);
      }
      if (this.editQuestionInstance !== null && this.editQuestionInstance.id) {
        this.quizService
          .updateQuestion(
            this.editInstance.id,
            this.editQuestionInstance.id,
            data,
          )
          .subscribe((question_data) => {
            this.fetchQuizQuestions();
            this.questionForm.reset();
          });
      } else {
        this.quizService
          .addQuestion(this.editInstance.id, data)
          .subscribe((question_data) => {
            this.fetchQuizQuestions();
            this.questionForm.reset();
          });
      }
    }
  }

  public onNewQuestionClick() {
    this.questionForm.reset();
    this.editQuestionInstance = null;
  }

  public fetchFilterExam(query: string) {
    return this.http
      .get(`/api/s/exams`, {
        params: {
          search: query,
        },
      })
      .pipe(
        map((data: any) => {
          const data_results = data.results || [];
          const data_total_items = data.count || 0;
          return data_results.map(function (data_results: any): Exam {
            return {
              ...data_results,
            };
          });
        }),
      );
  }
  public getExamFilterTextField(item: Exam) {
    return `${item.id} - ${item.exam_type}`;
  }
}
