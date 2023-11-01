import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectGroupListComponent } from './subject-group-list/subject-group-list.component';
import { SubjectGroupEditComponent } from './subject-group-edit/subject-group-edit.component';
import { SubjectGroupAssignComponent } from './subject-group-assign/subject-group-assign.component';
import { IconModule } from '@coreui/icons-angular';
import {
  AvatarModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  PaginationModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { FilterableMultiselectModule } from '../../shared/components/filterable-multiselect/filterable-multiselect.module';
import { ModalModule as BsModalModule } from 'ngx-bootstrap/modal';
import { WidgetsModule } from 'src/app/views/widgets/widgets.module';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SmartTable1Component } from '../../shared/components/tables/smart-table1/smart-table1.component';
import { SmartPaginationComponent } from '../../shared/components/tables/smart-pagination/smart-pagination.component';
import { DebouncedSearchInputComponent } from '../../shared/components/debounced-search-input/debounced-search-input.component';
import { SmartTableModule } from '../../shared/components/tables/smart-table.module';

const routes: Routes = [
  {
    path: '',
    component: SubjectGroupListComponent,
  },
  {
    path: 'assign',
    component: SubjectGroupAssignComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CardModule,
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
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    PaginationModule,
    ModalModule,
    BsModalModule.forRoot(),
    SmartTableModule,
    FilterableMultiselectModule,
  ],
})
export class SubjectGroupModule {}
