import { Component } from '@angular/core';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { CertificateEditComponent } from '../certificate-edit/certificate-edit.component';
import { Certificate } from './../certificate';

@Component({
  selector: 'dashboard-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent {
  public table_title = 'Certificates';
  public actions: ITablesActionData<Certificate> = {
    list: {
      use: true,
      url: () => `/api/s/certificates/`,
    },
    edit: {
      use: true,
      component: CertificateEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/certificates/${id}/`,
    },
    create: {
      use: true,
      component: CertificateEditComponent,
    },
  };
  public columns: ITableColumn<Certificate>[] = [
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
        return item.student?.user?.username || '';
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
