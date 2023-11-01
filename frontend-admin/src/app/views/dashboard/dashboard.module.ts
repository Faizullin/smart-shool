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

import { ModalModule as BsModalModule } from 'ngx-bootstrap/modal';
import { FilterableMultiselectModule } from './shared/components/filterable-multiselect/filterable-multiselect.module';
import { SmartTableModule } from './shared/components/tables/smart-table.module';
import { DebouncedSearchInputModule } from './shared/components/debounced-search-input/debounced-search-input.module';

import { UserListComponent } from './features/user/user-list/user-list.component';
import { QuizListComponent } from './features/quiz/quiz-list/quiz-list.component';
import { QuizEditComponent } from './features/quiz/quiz-edit/quiz-edit.component';
import { UserEditComponent } from './features/user/user-edit/user-edit.component';
import { ArticleEditComponent } from './features/article/article-edit/article-edit.component';
import { ArticleListComponent } from './features/article/article-list/article-list.component';
import { ResultListComponent } from './features/result/result-list/result-list.component';
import { ResultEditComponent } from './features/result/result-edit/result-edit.component';
import { UserAnswerListComponent } from './features/user_answer/user-answer-list/user-answer-list.component';
import { UserAnswerEditComponent } from './features/user_answer/user-answer-edit/user-answer-edit.component';
import { SeriesListComponent } from './features/series/series-list/series-list.component';
import { SeriesEditComponent } from './features/series/series-edit/series-edit.component';
import { BaseListComponent } from './shared/components/base-component/base-list/base-list.component';
import { BaseEditComponent } from './shared/components/base-component/base-edit/base-edit.component';
import { CertificateListComponent } from './features/certificate/certificate-list/certificate-list.component';
import { CertificateEditComponent } from './features/certificate/certificate-edit/certificate-edit.component';
import { ExamListComponent } from './features/exam/exam-list/exam-list.component';
import { ExamEditComponent } from './features/exam/exam-edit/exam-edit.component';
import { SubjectListComponent } from './features/subject/subject-list/subject-list.component';
import { SubjectEditComponent } from './features/subject/subject-edit/subject-edit.component';
import { StudentListComponent } from './features/student/student-list/student-list.component';
import { StudentEditComponent } from './features/student/student-edit/student-edit.component';
import { StudentTrainFaceImageListComponent } from './features/student-train-face-image/student-train-face-image-list/student-train-face-image-list.component';
import { StudentTrainFaceImageEditComponent } from './features/student-train-face-image/student-train-face-image-edit/student-train-face-image-edit.component';

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
    CKEditorModule,
    SmartTableModule,
    FilterableMultiselectModule,
    DebouncedSearchInputModule,
  ],
  declarations: [
    DashboardComponent,
    UserListComponent,
    UserEditComponent,
    QuizListComponent,
    QuizEditComponent,
    ArticleListComponent,
    ArticleEditComponent,
    ResultListComponent,
    ResultEditComponent,
    UserAnswerListComponent,
    UserAnswerEditComponent,
    SeriesListComponent,
    SeriesEditComponent,
    BaseListComponent,
    BaseEditComponent,
    CertificateListComponent,
    CertificateEditComponent,
    ExamListComponent,
    ExamEditComponent,
    SubjectListComponent,
    SubjectEditComponent,
    StudentListComponent,
    StudentEditComponent,
    StudentTrainFaceImageListComponent,
    StudentTrainFaceImageEditComponent,
  ],
})
export class DashboardModule {}
