import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import {
  AvatarModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  ProgressModule,
  TabsModule,
} from '@coreui/angular';
import { ModalModule as BsModalModule } from 'ngx-bootstrap/modal';
import { RouterModule, Routes } from '@angular/router';
import { NgFor } from '@angular/common';
import { SmartTableModule } from '../../shared/components/tables/smart-table.module';
import { FilterableMultiselectModule } from '../../shared/components/filterable-multiselect/filterable-multiselect.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';
import { ExamStatsComponent } from './exam-stats/exam-stats.component';
import { BaseModule } from '../../shared/components/base-component/base.module';

const routes: Routes = [
  {
    path: 'list',
    component: ExamListComponent,
    data: {
      title: $localize`Exams`,
    },
  },
];

@NgModule({
  declarations: [
    ExamListComponent,
    ExamEditComponent,
    ExamStatsComponent,
    // ExamStatsComponent,
  ],
  imports: [
    CardModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ButtonModule,
    ButtonModule,
    AvatarModule,
    ModalModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    BsModalModule.forRoot(),
    SmartTableModule,
    FilterableMultiselectModule,
    RouterModule.forChild(routes),
    NgFor,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    BaseModule,
  ],
})
export class ExamModule {}
