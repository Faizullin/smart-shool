import { Component } from '@angular/core';
import {
  BaseListComponent,
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { StudentAnswerEditComponent } from '../student-answer-edit/student-answer-edit.component';
import { StudentAnswer } from '../student-answer';

@Component({
  selector: 'dashboard-student-answer',
  templateUrl: './student-answer-list.component.html',
  styleUrls: ['./student-answer-list.component.scss'],
})
export class StudentAnswerListComponent {
  public table_title = 'Student selected answers';
  public actions: ITablesActionData<StudentAnswer> = {
    list: {
      use: true,
      url: () => `/api/s/student-answers/`,
    },
    edit: {
      use: true,
      component: StudentAnswerEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/student-answers/${id}/`,
    },
  };
  public columns: ITableColumn<StudentAnswer>[] = [
    {
      header: 'Id',
      field: 'id',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Student',
      field: 'student',
      filter: {
        type: 'text',
      },
      render(item) {
        return item.result?.student?.user?.username || '';
      },
    },
    {
      header: 'Score',
      field: 'score',
    },
    {
      header: 'Created At',
      field: 'created_at',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    // {
    //   header: 'Updated At',
    //   field: 'updated_at',
    //   sortable: true,
    //   filter: {
    //     type: 'text',
    //   },
    // },
  ];
}
