import { HttpClient } from '@angular/common/http';
import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { debounceTime, map } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';
import { IFilterProps } from '../../filterable-multiselect/filterable-multiselect.component';
import { FormControl } from '@angular/forms';
import { LoadingState } from 'src/app/core/models/loading-state';
import { Router } from '@angular/router';

export interface ITableColumn<T> {
  header: string;
  field: string;
  sortable?: boolean;
  filter?: IFilterProps;
  render?: (item: T) => string;
}
interface ITableItemAction<T> {
  onClick?: (item: T) => any;
  use: boolean;
  url?: (id?: number) => string;
  component?: any;
  redirectUrl?: (item?: T) => string;
}
export type ITablesActionData<T> = Partial<
  Record<'edit' | 'create' | 'delete' | 'list', ITableItemAction<T>>
>;
export interface IFilterRequestParams {
  ordering: string;
  filters: { [key: string]: any };
}
export interface IPaginationData {
  pageSize: number;
  pageSizeOptions: number[];
  page: number;
  totalPages: number;
}
@Component({
  selector: 'dashboard-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss'],
})
export class BaseListComponent<T> implements OnInit {
  @Input() title!: string;
  @Input() columns: ITableColumn<T>[] = [];
  @Input() upper_filters: ITableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() actions: ITablesActionData<T> = {};
  @Input() output_actions: ITablesActionData<T> = {};
  @Input() loading: LoadingState = {
    list: false,
    post: false,
  };
  @Input() filterParams: IFilterRequestParams = {
    ordering: '-id',
    filters: {},
  };
  public filterControls: { [key: string]: FormControl } = {};
  protected pagination: IPaginationData = {
    page: 1,
    pageSize: 10,
    totalPages: 0,
    pageSizeOptions: [1, 10, 25, 50, 100],
  };
  bsModalRef?: BsModalRef<any>;
  constructor(
    protected http: HttpClient,
    protected modalService: BsModalService,
    protected authStorageService: AuthStorageService,
    protected router: Router,
  ) {}
  ngOnInit(): void {
    const newFilterControls: { [key: string]: FormControl } = {};
    this.columns.forEach((column) => {
      if (column.filter) {
        newFilterControls[column.field] = new FormControl();
        if (column.filter.type === 'text') {
          newFilterControls[column.field].valueChanges
            .pipe(debounceTime(500))
            .subscribe((value: string) => {
              this.filterParams.filters[column.field] = value;
              this.pagination.page = 1;
              this.fetchData();
            });
        } else if (column.filter.type === 'select') {
          newFilterControls[column.field].valueChanges
            .pipe(debounceTime(500))
            .subscribe((value: any) => {
              this.filterParams.filters[column.field] = value;
              this.pagination.page = 1;
              this.fetchData();
            });
        } else if (column.filter.type === 'date') {
          newFilterControls[column.field].valueChanges
            .pipe(debounceTime(500))
            .subscribe((value: any) => {
              if (value) {
                this.filterParams.filters[column.field] = value;
              } else {
                delete this.filterParams.filters[column.field];
              }
              this.pagination.page = 1;
              this.fetchData();
            });
        }
        if (column.filter.fetch?.useInitital) {
          column.filter.fetch?.action!().subscribe({
            next: (_data) => {
              if (column.filter?.fetch) {
                column.filter.fetch.data = _data;
              }
            },
          });
        }
      }
    });
    this.upper_filters.forEach((column) => {
      if (column.filter) {
        newFilterControls[column.field] = new FormControl();
        if (column.filter.type === 'text') {
          newFilterControls[column.field].valueChanges
            .pipe(debounceTime(500))
            .subscribe((value: string) => {
              this.filterParams.filters[column.field] = value;
              this.pagination.page = 1;
              this.fetchData();
            });
        } else if (column.filter.type === 'select') {
          newFilterControls[column.field].valueChanges
            .pipe(debounceTime(500))
            .subscribe((value: any) => {
              this.filterParams.filters[column.field] = value;
              this.pagination.page = 1;
              this.fetchData();
            });
        }
        if (column.filter.fetch?.useInitital) {
          column.filter.fetch?.action!().subscribe({
            next: (_data) => {
              if (column.filter?.fetch) {
                column.filter.fetch.data = _data;
              }
            },
          });
        }
      }
    });
    this.filterControls = newFilterControls;
    this.fetchData();
  }
  protected getFilters(data: any) {
    const apply_filters = {
      ...this.filterParams,
      ...this.filterParams.filters,
      page_size: this.pagination.pageSize,
      page: this.pagination.page,
      ...data,
    };
    delete apply_filters.filters;
    return apply_filters;
  }
  protected fetchData(data?: any) {
    this.loading.list = true;
    this.fetchDataRequest(this.getFilters(data)).subscribe({
      next: (data) => {
        this.data = data.results;
        this.pagination.totalPages = data.count;
        this.loading.list = false;
      },
      error: () => {
        this.loading.list = false;
      },
    });
  }
  public onSortChanged(item: ITableColumn<T>) {
    if (item.sortable) {
      const sortKey = item.field;
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
  }
  onPageSizeChange(pageSize: number) {
    this.pagination.pageSize = pageSize;
    this.pagination.page = 1;
    this.fetchData();
  }
  onPageChange(page: number) {
    this.pagination.page = page;
    this.fetchData();
  }
  protected fetchDataRequest(filters?: any) {
    return this.http
      .get(this.actions.list!.url!(), {
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
    if (item) {
      if (this.actions?.['edit']?.redirectUrl !== undefined) {
        this.router.navigateByUrl(this.actions?.['edit']?.redirectUrl(item));
      } else if (this.actions?.['edit']?.component !== undefined) {
        const initialState: any = {};
        if (item !== undefined) {
          initialState.id = (item as any).id;
        }
        this.bsModalRef = this.modalService.show(
          this.actions?.['edit']?.component,
          {
            initialState,
            class: 'modal-lg',
          },
        );
        this.bsModalRef.onHidden?.subscribe((reason: string) => {
          this.fetchData();
        });
        this.bsModalRef.content.closeBtnName = 'Close';
      }
    } else {
      if (this.actions?.['create']?.redirectUrl !== undefined) {
        this.router.navigateByUrl(this.actions?.['create']?.redirectUrl());
      } else if (this.actions?.['create']?.component !== undefined) {
        const initialState: any = {};
        if (item !== undefined) {
          initialState.id = (item as any).id;
        }
        this.bsModalRef = this.modalService.show(
          this.actions?.['create']?.component,
          {
            initialState,
            class: 'modal-lg',
          },
        );
        this.bsModalRef.onHidden?.subscribe((reason: string) => {
          this.fetchData();
        });
      }
    }
  }
  onDelete(item?: T) {
    if (item && this.actions.delete?.use) {
      if (confirm('Are you sure to delete object?')) {
        this.http
          .delete(this.actions.delete!.url!((item as any).id))
          .subscribe({
            next: () => {
              this.fetchData();
            },
            error: () => {
              alert('something went wrong');
            },
          });
      }
    }
  }
  @ContentChildren(TemplateRef) columnTemplates?: QueryList<TemplateRef<any>>;
  get contentColumns() {
    return this.columns.map((column, index) => {
      const ddata: Record<string, any> = {};
      const column_template =
        this.columnTemplates?.find((item) => {
          const item_attrs = (item as any)._declarationTContainer.attrs;
          for (let index = 0; index < item_attrs.length; index += 2) {
            ddata[item_attrs[index]] = item_attrs[index + 1];
          }
          return ddata['columnDef'] === column.field;
        }) || undefined;
      return {
        header: column.header,
        field: column.field,
        sortable: column?.sortable,
        template: column_template,
        render: column.render,
      };
    });
  }
  get filters_count(): number {
    const filter_defined = this.columns.map(
      (item) => item.filter !== undefined,
    );
    return filter_defined.filter((item) => item === true).length;
  }
  public getItemColumnValue(item: T, column_field: string) {
    return (item as any)[column_field];
  }
  public getFilterLabel(option: any, column: ITableColumn<T>) {
    return option[column.filter?.fetch?.label_field || 'label'];
  }
  public getFilterValue(option: any, column: ITableColumn<T>) {
    return option[column.filter?.fetch?.value_field || 'value'];
  }
  public onFilterDateChange(value: Date, column: string) {
    if (value) {
      // const newDate = new Date(
      //   value.getFullYear(),
      //   value.getMonth(),
      //   value.getDate() + 1,
      // );
      const newDate = value;
      this.filterControls[column].patchValue(
        newDate.toISOString().split('T')[0], // .split('T')[0], // .split('T')[0] + 'T00:00:00.000Z',
      );
    } else {
      this.filterControls[column].patchValue(null);
    }
  }
}
