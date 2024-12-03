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
import { ResultListComponent } from './result-list/result-list.component';
import { ResultEditComponent } from './result-edit/result-edit.component';
import { SmartTableModule } from '../../shared/components/tables/smart-table.module';
import { FilterableMultiselectModule } from '../../shared/components/filterable-multiselect/filterable-multiselect.module';
import { WidgetsModule } from 'src/app/views/widgets/widgets.module';
import { ResultStatsComponent } from './result-stats/result-stats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { BaseModule } from '../../shared/components/base-component/base.module';

const routes: Routes = [
  {
    path: 'list',
    component: ResultListComponent,
    data: {
      title: $localize`Results`,
    },
  },
];

@NgModule({
  declarations: [
    ResultListComponent,
    ResultEditComponent,
    ResultStatsComponent,
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
    WidgetsModule,
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
export class ResultModule {}
