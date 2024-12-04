import { Component } from '@angular/core';
import {
  BaseListComponent,
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';
import { Router } from '@angular/router';
import { Article } from '../article';
import { map } from 'rxjs';

@Component({
  selector: 'dashboard-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  public table_title = 'Articles';
  public actions: ITablesActionData<Article> = {
    list: {
      use: true,
      url: () => `/api/s/articles/`,
    },
    edit: {
      use: true,
      redirectUrl: (item) => `/dashboard/articles/${item?.id}/edit`,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/articles/${id}/`,
    },
    create: {
      use: true,
      redirectUrl: () => `/dashboard/articles/edit`,
    },
  };
  public columns: ITableColumn<Article>[] = [
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
      header: 'Featured Image',
      field: 'featured_image',
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
