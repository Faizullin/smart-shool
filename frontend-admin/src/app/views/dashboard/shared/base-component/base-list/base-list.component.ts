import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoadingState } from './../../../../../core/models/loading-state';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterParams } from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { BaseEditComponent } from '../base-edit/base-edit.component';

@Component({
  template: `<c-row>
    <c-col xs>
      <c-card class="mb-4">
        <c-card-header>{{ table_title }}</c-card-header>
        <c-card-body></c-card-body>
      </c-card>
    </c-col>
  </c-row>`,
})
export class BaseListComponent<T> implements OnInit {
  public action_urls: { [key: string]: Function } = {
    list: () => ``,
    delete: () => ``,
  };
  public loading: LoadingState = {
    list: false,
    post: false,
  };
  public pageSizeOptions: number[] = [1, 10, 25, 50, 100];
  public filterParams: FilterParams = {
    filterText: '',
    ordering: 'default',
    page_size: 10,
    page: 1,
  };
  public totalPages: number = 1;
  protected bsModalRef!: BsModalRef;
  public table_title: string = 'Items';
  public data: T[] = [];
  constructor(
    protected http: HttpClient,
    protected modalService: BsModalService,
  ) {}
  ngOnInit(): void {
    this.fetchData();
  }
  protected fetchData() {
    this.loading.list = true;
    this.fetchDataRequest({
      ...this.filterParams,
      search: this.filterParams.filterText,
    }).subscribe({
      next: (data) => {
        this.data = data.results;
        this.totalPages = data.count;
      },
    });
  }
  onSortChange(sortKey: string) {
    if (sortKey.startsWith('-')) {
      const tmp_sortKey = sortKey.slice(1);
      if (tmp_sortKey === this.filterParams.ordering) {
        this.filterParams.ordering = tmp_sortKey;
      }
    } else {
      if (sortKey === this.filterParams.ordering) {
        this.filterParams.ordering = '-' + this.filterParams.ordering;
      } else {
        this.filterParams.ordering = sortKey;
      }
    }
    this.fetchData();
  }
  onFilterChange(filterText: string) {
    this.filterParams.filterText = filterText;
    this.fetchData();
  }
  onPageSizeChange(pageSize: number) {
    this.filterParams.page_size = pageSize;
    this.filterParams.page = 1;
    this.fetchData();
  }
  onPageChange(page: number) {
    this.filterParams.page = page;
    this.fetchData();
  }
  openEditModal(initialState: any): void {}
  private openDeleteModal(item: T) {
    if (confirm('Are you sure to delete object?')) {
      this.http.delete(this.action_urls['delete']((item as any).id)).subscribe({
        next: () => {
          this.fetchData();
        },
        error: () => {
          alert('something went wrong');
        },
      });
    }
  }
  private fetchDataRequest(filters?: any) {
    return this.http
      .get(this.action_urls['list'](), {
        params: {
          ...filters,
        },
      })
      .pipe(
        map((data: any) => {
          const data_results = data.results || [];
          const data_total_items = data.count || 0;
          return {
            results: data_results.map(function (data_results: any): T {
              return {
                ...data_results,
              } as T;
            }),
            count: data_total_items,
          };
        }),
      );
  }
  onEdit(item?: T) {
    const initialState: any = {};
    if (item !== undefined) {
      initialState.id = (item as any).id;
    }
    this.openEditModal(initialState);
  }
  onDelete(item?: T) {
    if (item) {
      this.openDeleteModal(item);
    }
  }
}
