import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { QuizEditComponent } from '../../quiz/quiz-edit/quiz-edit.component';
import { Exam } from '../exam';
import { ExamEditComponent } from '../exam-edit/exam-edit.component';
import { ExamStatsComponent } from '../exam-stats/exam-stats.component';

@Component({
  selector: 'dashboard-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
})
export class ExamListComponent {
  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
  ) {}
  public table_title = 'Exams';
  public actions: ITablesActionData<Exam> = {
    list: {
      use: true,
      url: () => `/api/s/exams/`,
    },
    edit: {
      use: true,
      component: ExamEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/exams/${id}/`,
    },
    create: {
      use: true,
      component: ExamEditComponent,
    },
  };
  public columns: ITableColumn<Exam>[] = [
    {
      header: 'Id',
      field: 'id',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Exam Type',
      field: 'exam_type',
      filter: {
        type: 'select',
        fetch: {
          data: [
            {
              label: 'Initital',
              value: 'i',
            },
            {
              label: 'Mid',
              value: 'm',
            },
            {
              label: 'Final',
              value: 'f',
            },
          ],
        },
      },
    },
    {
      header: 'Subject',
      field: 'subject',
      filter: {
        type: 'select',
        fetch: {
          useInitital: true,
          action: () =>
            this.http.get(`/api/s/subjects`).pipe(
              map((data: any) => {
                const data_results = data.results || [];
                return data_results;
              }),
            ),
          value_field: 'id',
          label_field: 'title',
        },
      },
      render(item) {
        return item.subject.title;
      },
    },
    {
      header: 'Quiz',
      field: 'quiz',
    },
    // {
    //   header: 'Created At',
    //   field: 'created_at',
    //   sortable: true,
    //   filter: {
    //     type: 'date',
    //   },
    // },
    // {
    //   header: 'Updated At',
    //   field: 'updated_at',
    //   sortable: true,
    //   filter: {
    //     type: 'date',
    //   },
    // },
    {
      header: 'Student stats',
      field: 'stats',
    },
  ];

  bsModalRef?: BsModalRef<any>;
  public onEditQuiz(item?: Exam) {
    const initialState: any = {};
    if (item !== undefined && (item as any).quiz) {
      initialState.id = (item as any).quiz.id;
    }
    this.bsModalRef = this.modalService.show(QuizEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
  public onStatsOpenClick(exam_id?: number) {
    const initialState: any = {};
    if (exam_id !== undefined) {
      initialState.id = exam_id;
    }
    this.bsModalRef = this.modalService.show(ExamStatsComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
