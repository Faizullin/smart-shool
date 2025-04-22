import { Component } from '@angular/core';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { ISubjectGroup } from '../subject-group';
import { SubjectGroupEditComponent } from '../subject-group-edit/subject-group-edit.component';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subject-group-list',
  templateUrl: './subject-group-list.component.html',
  styleUrls: ['./subject-group-list.component.scss'],
})
export class SubjectGroupListComponent {
  constructor(private http: HttpClient) {}
  public table_title = 'Subjects';
  public actions: ITablesActionData<ISubjectGroup> = {
    list: {
      use: true,
      url: () => `/api/s/subject-groups/`,
    },
    edit: {
      use: true,
      component: SubjectGroupEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/subject-groups/${id}/`,
    },
    create: {
      use: true,
      component: SubjectGroupEditComponent,
    },
  };
  public columns: ITableColumn<ISubjectGroup>[] = [
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
          label_field: 'title',
          value_field: 'id',
        },
      },
      render(item) {
        return item.subject?.title;
      },
    },
    {
      header: 'Teacher',
      field: 'teacher',
      filter: {
        type: 'text',
      },
      render(item) {
        return item.teacher?.username;
      },
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
  ];
}
