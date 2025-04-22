import { Component } from '@angular/core';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { User } from '../user';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'dashboard-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  public table_title = 'Users';
  public actions: ITablesActionData<User> = {
    list: {
      use: true,
      url: () => `/api/s/users/`,
    },
    edit: {
      use: true,
      component: UserEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/users/${id}/`,
    },
  };
  public columns: ITableColumn<User>[] = [
    {
      header: 'Id',
      field: 'id',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Username',
      field: 'username',
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Email',
      field: 'email',
      filter: {
        type: 'text',
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
