import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { WidgetsModule } from '../widgets/widgets.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModalModule as BsModalModule } from 'ngx-bootstrap/modal';
import { FilterableMultiselectModule } from './shared/components/filterable-multiselect/filterable-multiselect.module';

import { SmartTableComponent } from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { SmartPaginationComponent } from 'src/app/views/dashboard/shared/components/tables/smart-pagination/smart-pagination.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { QuizComponent } from './features/quiz/quiz/quiz.component';
import { QuizEditComponent } from './features/quiz/quiz-edit/quiz-edit.component';
import { UserEditComponent } from './features/user/user-edit/user-edit.component';
import { ArticleEditComponent } from './features/article/article-edit/article-edit.component';
import { ArticleListComponent } from './features/article/article-list/article-list.component';
import { LabworkListComponent } from './features/labwork/labwork-list/labwork-list.component';
import { LabworkEditComponent } from './features/labwork/labwork-edit/labwork-edit.component';
import { ResultListComponent } from './features/result/result-list/result-list.component';
import { ResultEditComponent } from './features/result/result-edit/result-edit.component';
import { SmartTable1Component } from './shared/components/tables/smart-table1/smart-table1.component';
import { UserAnswerListComponent } from './features/user_answer/user-answer-list/user-answer-list.component';
import { UserAnswerEditComponent } from './features/user_answer/user-answer-edit/user-answer-edit.component';
import { SeriesListComponent } from './features/series/series-list/series-list.component';
import { SeriesEditComponent } from './features/series/series-edit/series-edit.component';
import { BaseListComponent } from './shared/base-component/base-list/base-list.component';
import { BaseEditComponent } from './shared/base-component/base-edit/base-edit.component';
import { CertificateListComponent } from './features/certificates/certificate-list/certificate-list.component';
import { CertificateEditComponent } from './features/certificates/certificate-edit/certificate-edit.component';
import { StudentListComponent } from './features/students/student-list/student-list.component';
import { StudentEditComponent } from './features/students/student-edit/student-edit.component';
import { DebouncedSearchInputComponent } from './shared/components/debounced-search-input/debounced-search-input.component';
import { ExamListComponent } from './features/exam/exam-list/exam-list.component';
import { ExamEditComponent } from './features/exam/exam-edit/exam-edit.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
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
    BsModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule,
    FilterableMultiselectModule,
  ],
  declarations: [
    SmartTableComponent,
    SmartPaginationComponent,
    DashboardComponent,
    UserListComponent,
    UserEditComponent,
    UserEditComponent,
    QuizComponent,
    QuizEditComponent,
    ArticleListComponent,
    ArticleEditComponent,
    LabworkListComponent,
    LabworkEditComponent,
    ResultListComponent,
    ResultEditComponent,
    SmartTable1Component,
    UserAnswerListComponent,
    UserAnswerEditComponent,
    SeriesListComponent,
    SeriesEditComponent,
    BaseListComponent,
    BaseEditComponent,
    CertificateListComponent,
    CertificateEditComponent,
    StudentListComponent,
    StudentEditComponent,
    DebouncedSearchInputComponent,
    ExamListComponent,
    ExamEditComponent,
  ],
})
export class DashboardModule {}
