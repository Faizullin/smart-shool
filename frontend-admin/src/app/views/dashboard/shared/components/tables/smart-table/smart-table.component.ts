import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TableColumn<T> {
  header: string;
  field: keyof T;
  cellTemplate?: (data: T) => string; // Custom cell template function
}
export interface FilterParams {
  filterText: string;
  ordering: string;
  page_size: number;
  page: number;
  filters: { [key: string]: any };
}

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() pageSizeOptions: number[] = [1, 10, 25, 50, 100];
  @Input() filterText: string = '';
  @Input() pageSize: number = 10;
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Input() paginationRangeSize: number = 4;
  @Input() useActions: boolean = true;

  @Input() createAction: boolean = false;
  @Input() loading: boolean = false;

  @Output() sortChanged = new EventEmitter<string>();
  @Output() filterChanged = new EventEmitter<string>();
  @Output() pageSizeChanged = new EventEmitter<number>();
  @Output() pageChanged = new EventEmitter<number>();

  @Output() editOpened = new EventEmitter<T>();
  @Output() deleteOpened = new EventEmitter<T>();

  constructor() {}

  onSortChange(sortKey: any) {
    this.sortChanged.emit(`${sortKey}`);
  }
  onFilterChange(filterText: string) {
    this.filterChanged.emit(filterText);
  }

  onPageSizeChange(size: number) {
    this.pageSizeChanged.emit(size);
  }
  onPageChange(page: number) {
    this.pageChanged.emit(page);
  }

  onCreateOpenClick() {
    this.editOpened.emit();
  }
  onEditOpenClick(item: T) {
    this.editOpened.emit(item);
  }
  onDelete(item: T) {
    this.deleteOpened.emit(item);
  }
}
