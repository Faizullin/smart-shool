import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';

interface UseActionShow {
  edit: boolean;
  create: boolean;
  delete: boolean;
}

@Component({
  selector: 'app-smart-table1',
  templateUrl: './smart-table1.component.html',
  styleUrls: ['./smart-table1.component.scss'],
})
export class SmartTable1Component<T> {
  @Input() data: T[] = [];
  @Input() pageSizeOptions: number[] = [1, 10, 25, 50, 100];
  @Input() filterText: string = '';
  @Input() pageSize: number = 10;
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Input() paginationRangeSize: number = 4;
  @Input() useActions: UseActionShow = {
    create: true,
    edit: true,
    delete: true,
  };
  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<T>();

  @Output() sortChanged = new EventEmitter<string>();
  @Output() filterChanged = new EventEmitter<string>();
  @Output() pageSizeChanged = new EventEmitter<number>();
  @Output() pageChanged = new EventEmitter<number>();

  @ContentChildren(TemplateRef) columnTemplates?: QueryList<TemplateRef<any>>;

  get columns() {
    return this.columnTemplates?.map((item, index) => {
      const ddata: {
        [key: string]: any;
      } = {};
      const item_attrs = (item as any)._declarationTContainer.attrs;
      for (let index = 0; index < item_attrs.length; index += 2) {
        ddata[item_attrs[index]] = item_attrs[index + 1];
      }
      return {
        header: ddata['columnLabel'],
        field: ddata['columnDef'],
        sortable: ddata['sortable'] === 'true',
        template: item,
      };
    });
  }
  onSortChange(column: any) {
    if (column.sortable == true) {
      this.sortChanged.emit(`${column.field}`);
    }
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
    this.onEdit.emit();
  }
  onEditOpenClick(item: T) {
    this.onEdit.emit(item);
  }
  onDeleteClick(item: T) {
    this.onDelete.emit(item);
  }
}
