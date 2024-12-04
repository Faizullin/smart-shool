import { Component } from '@angular/core';
import { ISubject } from '../subject';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { SubjectEditComponent } from '../subject-edit/subject-edit.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent {
  public table_title = 'Subjects';
  public actions: ITablesActionData<ISubject> = {
    list: {
      use: true,
      url: () => `/api/s/subjects/`,
    },
    edit: {
      use: true,
      component: SubjectEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/subjects/${id}/`,
    },
    create: {
      use: true,
      component: SubjectEditComponent,
    },
  };
  public columns: ITableColumn<ISubject>[] = [
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
