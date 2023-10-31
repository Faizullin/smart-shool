import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { map } from 'rxjs';

export interface IFilters {
  id: number;
  title: string;
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
  @Input() remoteResponseField!: string;
  @Input() multiple: boolean = true;
  @Input() allowSearchFilter: boolean = true;
  @Input() allowRemoteDataSearch: boolean = false;
  @Input() current_selected_filters: TFilters[] = [];
  @Input() searchFiltersKey!: string;
  @Input() useInitialLoad: boolean = true;
  @Input() current_filters: TFilters[] = [];

  value?: TFilters[];

  public multiselectTagDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: false,
    allowRemoteDataSearch: true,
  };
  constructor(private http: HttpClient) {}

  propagateChange = (_: any) => {};

  onChange(value: any) {
    this.value = value;
    this.propagateChange(value); // Notify the form about the change
  }
  writeValue(obj: any): void {
    this.value = obj;
    this.current_selected_filters = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  ngOnInit(): void {
    this.multiselectTagDropdownSettings.idField = this.idField;
    this.multiselectTagDropdownSettings.textField = this.textField;
    this.multiselectTagDropdownSettings.singleSelection = !this.multiple;
    this.multiselectTagDropdownSettings.allowSearchFilter =
      this.allowSearchFilter;
    this.multiselectTagDropdownSettings.allowRemoteDataSearch =
      this.allowRemoteDataSearch;
    if (this.useInitialLoad) {
      this.onFilterChange('');
    }
  }
  onSelect(item: any) {
    this.onChange([item]);
  }
  onSelectAll(items: any) {
    if (this.multiple) {
      this.onChange(items);
    }
  }
  onDeSelect(item: any) {
    const filtered_items =
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
  private fetchFilters(filter?: string) {
    return this.http
      .get<any>(`/api/filters/${this.searchFiltersKey}/`, {
        params: {
          search: filter || '',
        },
      })
      .pipe(
        map((data: any) => {
          const data_results = data || [];
          return {
            [this.remoteResponseField]: data_results.map(function (
              items: any,
            ): TFilters {
              return {
                ...items,
              } as TFilters;
            }),
          };
        }),
      );
  }
  public onFilterChange(filter: any) {
    if (this.allowRemoteDataSearch) {
      this.fetchFilters(filter).subscribe({
        next: (_data) => {
          this.current_filters = _data[this.remoteResponseField];
        },
      });
    }
  }
}
