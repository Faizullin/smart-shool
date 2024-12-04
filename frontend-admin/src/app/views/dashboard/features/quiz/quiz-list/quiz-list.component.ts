import { Component } from '@angular/core';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { QuizEditComponent } from '../quiz-edit/quiz-edit.component';
import { Quiz } from '../quiz';

@Component({
  selector: 'dashboard-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent {
  public table_title = 'Quizzes';
  public actions: ITablesActionData<Quiz> = {
    list: {
      use: true,
      url: () => `/api/s/quizzes/`,
    },
    edit: {
      use: true,
      component: QuizEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/quizzes/${id}/`,
    },
    create: {
      use: true,
      component: QuizEditComponent,
    },
  };
  public columns: ITableColumn<Quiz>[] = [
    {
      header: 'Id',
      field: 'id',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Title',
      field: 'title',
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Created At',
      field: 'created_at',
      sortable: true,
      filter: {
        type: 'date',
      },
    },
    // {
    //   header: 'Updated At',
    //   field: 'updated_at',
    //   sortable: true,
    //   filter: {
    //     type: 'date',
    //   },
    // },
  ];
}
