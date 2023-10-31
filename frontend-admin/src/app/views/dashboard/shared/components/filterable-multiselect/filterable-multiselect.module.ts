import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterableMultiselectComponent } from './filterable-multiselect.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterableMultiselectComponent],
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule],
  exports: [FilterableMultiselectComponent],
})
export class FilterableMultiselectModule {}
