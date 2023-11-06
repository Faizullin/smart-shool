import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTableComponent } from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { SmartPaginationComponent } from 'src/app/views/dashboard/shared/components/tables/smart-pagination/smart-pagination.component';
import { SmartTable1Component } from './smart-table1/smart-table1.component';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  PaginationModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { DebouncedSearchInputModule } from '../debounced-search-input/debounced-search-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from 'src/app/views/widgets/widgets.module';
import { ChartjsModule } from '@coreui/angular-chartjs';

@NgModule({
  declarations: [
    SmartPaginationComponent,
    SmartTableComponent,
    SmartTable1Component,
  ],
  imports: [
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    FormsModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    PaginationModule,
    ModalModule,
    RouterModule,
    DebouncedSearchInputModule,
  ],
  exports: [
    SmartPaginationComponent,
    SmartTableComponent,
    SmartTable1Component,
  ]
})
export class SmartTableModule {}
