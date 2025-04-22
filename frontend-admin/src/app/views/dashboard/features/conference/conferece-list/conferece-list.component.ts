import { Component, OnInit } from '@angular/core';
import { Conference } from '../conference';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { User } from '../../user/user';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';
import { ConfereceEditComponent } from '../conferece-edit/conferece-edit.component';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dashboard-conferece-list',
  templateUrl: './conferece-list.component.html',
  styleUrls: ['./conferece-list.component.scss'],
})
export class ConfereceListComponent implements OnInit {
  user: User | null = null;
  constructor(
    private authStorageService: AuthStorageService,
    private http: HttpClient,
  ) {}
  ngOnInit(): void {
    this.user = this.authStorageService.getUser();
  }
  public table_title = 'Conferences';
  public actions: ITablesActionData<Conference> = {
    list: {
      use: true,
      url: () => `/api/s/conferences/`,
    },
    edit: {
      use: true,
      component: ConfereceEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/conferences/${id}/`,
    },
    create: {
      use: true,
      component: ConfereceEditComponent,
    },
  };
  public columns: ITableColumn<Conference>[] = [
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
      header: 'Planned Time',
      field: 'planned_time',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Status',
      field: 'status',
      filter: {
        type: 'select',
        fetch: {
          data: [
            {
              value: 'planned',
              label: 'Planned',
            },
            {
              value: 'ongoing',
              label: 'Ongoing',
            },
            {
              value: 'completed',
              label: 'Completed',
            },
          ],
        },
      },
    },
    {
      header: '',
      field: 'additional_actions',
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
  public upper_filters: ITableColumn<Conference>[] = [
    {
      header: 'Subject Group',
      field: 'subject_group',
      filter: {
        type: 'select',
        fetch: {
          useInitital: true,
          action: () =>
            this.http.get(`/api/s/subject-groups`).pipe(
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
        return (item as any).current_group?.title;
      },
    },
  ];

  public onJoinClick(item: Conference) {
    window.location.href = `/conference/${item.id}/`;
  }
}
