import { Component } from '@angular/core';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { Notification } from './../notification';
import { NotificationEditComponent } from '../notification-edit/notification-edit.component';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent {
  constructor(private http: HttpClient) {}
  public table_title = 'Notifications';
  public actions: ITablesActionData<Notification> = {
    list: {
      use: true,
      url: () => `/api/s/notifications/`,
    },
    edit: {
      use: true,
      component: NotificationEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/notifications/${id}/`,
    },
    create: {
      use: true,
      component: NotificationEditComponent,
    },
  };
  public columns: ITableColumn<Notification>[] = [
    {
      header: 'Id',
      field: 'id',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Description',
      field: 'description',
      render(item) {
        return item.description?.length > 20
          ? item.description.substring(0, 19) + '...'
          : item.description;
      },
    },
    {
      header: 'Recipient',
      field: 'recipient',
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Status',
      field: 'unread',
      filter: {
        type: 'select',
        fetch: {
          data: [
            {
              value: 'false',
              label: 'Read',
            },
            {
              value: 'true',
              label: 'Unread',
            },
          ],
        },
      },
    },
  ];
  public upper_filters: ITableColumn<Notification>[] = [
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
}
