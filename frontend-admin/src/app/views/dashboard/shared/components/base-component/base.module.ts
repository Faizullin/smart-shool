import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule as BsModalModule } from 'ngx-bootstrap/modal';
import { FilterableMultiselectModule } from './../filterable-multiselect/filterable-multiselect.module';
import { DebouncedSearchInputModule } from './../debounced-search-input/debounced-search-input.module';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ModalModule,
  PaginationModule,
  SpinnerModule,
  TableModule,
  ToastModule,
} from '@coreui/angular';
import { BaseListComponent } from './base-list/base-list.component';
import { BaseEditComponent } from './base-edit/base-edit.component';
import { SmartTableModule } from './../tables/smart-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [BaseListComponent, BaseEditComponent],
  imports: [
    CommonModule,
    CardModule,
    GridModule,
    FormModule,
    FormsModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    PaginationModule,
    ModalModule,
    ReactiveFormsModule,
    SmartTableModule,
    BsModalModule.forRoot(),
    FilterableMultiselectModule,
    DebouncedSearchInputModule,
    SpinnerModule,
    IconModule,
    DropdownModule,
    BsDatepickerModule.forRoot(),
    ToastModule,
  ],
  providers: [BsDatepickerConfig],
  exports: [BaseListComponent, BaseEditComponent],
})
export class BaseModule {}
