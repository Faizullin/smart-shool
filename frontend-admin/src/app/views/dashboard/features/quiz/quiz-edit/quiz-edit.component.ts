import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IQuestionType, Quiz, Question } from '../quiz';
import { QuizService } from 'src/app/core/services/quiz.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  FilterParams,
  TableColumn,
} from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Exam } from '../../exam/exam';

const QuestionTypeLabels = {
  c: 'Closed-ended',
  o: 'Open-ended',
  d: 'Draggable',
};

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
  public editQuestionInstance: Question | null = null;
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
      title: ['', Validators.required],
      exam: [[], Validators.required],
      duration_time: [0],
      type: [['c'], Validators.required],
    });
    super.ngOnInit();
  }

  selectedFormType: IQuestionType = 'c';
  selectedFormTypeChanged(formType: IQuestionType) {
    this.editQuestionInstance = null;
    // this.selectedFormType = formType;
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
  protected override getPreparedEditData(data: any): Object {
    data.exam_id = data.exam.length > 0 ? data.exam[0].id : null;
    return data;
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
  public onSuccessfullQuestionSubmit(item: any) {
    this.editQuestionInstance = null;
    this.fetchQuizQuestions();
  }
  public getExamFilterTextField(item: Exam) {
    return `${item.id} - ${item.exam_type}`;
  }

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
      header: 'Question type',
      field: 'type',
      cellTemplate: (data: Question) => `${QuestionTypeLabels[data.type]}`,
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
  public filterParams: FilterParams = {
    page: 1,
    page_size: 10,
    filterText: '',
    ordering: 'id',
    filters: {},
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
  public onNewQuestionClick() {
    this.editQuestionInstance = null;
  }
  onEditQuestionOpen(item: Question) {
    if (this.editInstance !== null && item.id !== undefined) {
      this.quizService.getQuestion(this.editInstance.id, item.id).subscribe({
        next: (question_item) => {
          this.selectedFormType = question_item.type;
          this.editQuestionInstance = question_item;
        },
      });
    }
  }
  onDeleteQuestion(item: Question) {
    if (this.editInstance !== null && item.id !== undefined) {
      this.quizService.deleteQuestion(this.editInstance.id, item.id).subscribe({
        next: () => {
          if (this.editInstance?.id === item.id) {
            this.editInstance = null;
            this.form.reset();
          }
          this.fetchQuizQuestions();
        },
      });
    }
  }
  public fetchFilterRequest = {
    exams: (filters?: any) => {
      return this.http
        .get(`/api/s/exams`, {
          params: {
            ...filters,
            quiz__isnull: true,
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
    },
  };
}
