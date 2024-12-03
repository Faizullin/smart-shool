import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable, Subject, debounceTime } from 'rxjs';

export interface IFilters {
  id: number;
  title: string;
}
interface IFilterDataItem {
  label: string;
  value: string;
}
export interface IFilterProps {
  type: 'select' | 'text' | 'date';
  fetch?: {
    action?: (data?: any) => Observable<any>;
    useInitital?: boolean;
    searchable?: boolean;
    data?: IFilterDataItem[];
    value_field?: string;
    label_field?: string;
  };
  defaultValue?: string[];
}

@Component({
  selector: 'app-filterable-multiselect',
  templateUrl: './filterable-multiselect.component.html',
  styleUrls: ['./filterable-multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterableMultiselectComponent),
      multi: true,
    },
  ],
})
export class FilterableMultiselectComponent<TFilters>
  implements OnInit, ControlValueAccessor
{
  @Input() idField!: string;
  @Input() textField!: string;
  @Input() textFieldDef?: (item: any) => string;
  @Input() multiple: boolean = true;
  @Input() allowSearchFilter: boolean = true;
  @Input() allowRemoteDataSearch: boolean = false;
  @Input() current_selected_filters: TFilters[] = [];
  @Input() useInitialLoad: boolean = true;
  @Input() current_filters: TFilters[] = [];
  @Input() filterMethod?: (query: string) => Observable<any>;
  @Input() itemsShowLimit: number = 4;

  private filterChangeSubject = new Subject<string>();
  value?: TFilters[];

  public multiselectTagDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true,
    closeDropDownOnSelection: false,
    allowRemoteDataSearch: true,
  };
  constructor() {
    this.filterChangeSubject
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        this.fetchFilters({
          search: value,
          page_size: this.itemsShowLimit,
        }).subscribe({
          next: (_data: TFilters[]) => {
            this.current_filters = _data.map((item) => {
              if (this.textFieldDef !== undefined) {
                return {
                  ...item,
                  label: this.textFieldDef(item),
                };
              }
              return {
                ...item,
              };
            });
          },
        });
      });
  }

  propagateChange = (_: any) => {};

  onChange(value: any) {
    this.value = value;
    this.propagateChange(value); // Notify the form about the change
  }
  writeValue(obj: any): void {
    this.value = obj;
    if (this.textFieldDef !== undefined) {
      this.current_selected_filters =
        obj?.map((item: any) => ({
          ...item,
          label: this.textFieldDef!(item) || '',
        })) || [];
    } else {
      this.current_selected_filters = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  ngOnInit(): void {
    this.multiselectTagDropdownSettings.idField = this.idField;
    this.multiselectTagDropdownSettings.textField =
      this.textFieldDef !== undefined ? 'label' : this.textField;
    this.multiselectTagDropdownSettings.singleSelection = !this.multiple;
    this.multiselectTagDropdownSettings.allowSearchFilter =
      this.allowSearchFilter;
    this.multiselectTagDropdownSettings.itemsShowLimit = this.itemsShowLimit;
    this.multiselectTagDropdownSettings.allowRemoteDataSearch = true;
    if (this.useInitialLoad) {
      this.onFilterChange('', true);
    }
  }
  onSelect(item: any) {
    const items = this.value ? [...this.value] : [];
    items.push(item);
    if (this.multiple) {
      this.onChange(items);
    } else {
      this.onChange([item]);
    }
  }
  onSelectAll(items: any) {
    if (this.multiple) {
      this.onChange(items);
    }
  }
  onDeSelect(item: any) {
    let filtered_items = [];
    filtered_items =
      (this.value!.filter(
        (current_item) =>
          (item as any).id != (current_item as any)[this.idField],
      ) as any) || [];
    this.onChange(filtered_items);
  }
  onDeSelectAll(items: any) {
    const filtered_items =
      (this.value!.filter(
        (current_item) =>
          !items.some((obj: any) => {
            return (obj as any).id != (current_item as any)[this.idField];
          }),
      ) as any) || [];
    this.onChange(filtered_items);
  }
  private fetchFilters(query?: any) {
    return this.filterMethod!(query);
  }
  public onFilterChange(query: any, forceLoad = false) {
    if (this.allowRemoteDataSearch || forceLoad) {
      this.filterChangeSubject.next(query as string);
    }
  }
}
