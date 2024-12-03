import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  ToastModule,
} from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { WidgetsModule } from '../widgets/widgets.module';
import { BaseModule } from './shared/components/base-component/base.module';

import { CertificateEditComponent } from './features/certificate/certificate-edit/certificate-edit.component';
import { CertificateListComponent } from './features/certificate/certificate-list/certificate-list.component';
import { ConfereceEditComponent } from './features/conference/conferece-edit/conferece-edit.component';
import { ConfereceListComponent } from './features/conference/conferece-list/conferece-list.component';
import { FeedbackEditComponent } from './features/feedback/feedback-edit/feedback-edit.component';
import { NotificationEditComponent } from './features/notifications/notification-edit/notification-edit.component';
import { NotificationListComponent } from './features/notifications/notification-list/notification-list.component';
import { StudentAnswerEditComponent } from './features/student-answer/student-answer-edit/student-answer-edit.component';
import { StudentAnswerListComponent } from './features/student-answer/student-answer-list/student-answer-list.component';
import { StudentTrainFaceImageEditComponent } from './features/student-train-face-image/student-train-face-image-edit/student-train-face-image-edit.component';
import { StudentTrainFaceImageListComponent } from './features/student-train-face-image/student-train-face-image-list/student-train-face-image-list.component';
import { StudentEditComponent } from './features/student/student-edit/student-edit.component';
import { StudentListComponent } from './features/student/student-list/student-list.component';
import { SubjectEditComponent } from './features/subject/subject-edit/subject-edit.component';
import { SubjectListComponent } from './features/subject/subject-list/subject-list.component';
import { UserEditComponent } from './features/user/user-edit/user-edit.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { FilterableMultiselectModule } from './shared/components/filterable-multiselect/filterable-multiselect.module';

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
    BaseModule,
    FilterableMultiselectModule,
    ToastModule,
  ],
  declarations: [
    DashboardComponent,
    UserListComponent,
    UserEditComponent,
    CertificateListComponent,
    CertificateEditComponent,
    SubjectListComponent,
    SubjectEditComponent,
    StudentListComponent,
    StudentEditComponent,
    StudentTrainFaceImageListComponent,
    StudentTrainFaceImageEditComponent,
    NotificationListComponent,
    NotificationEditComponent,
    FeedbackEditComponent,
    StudentAnswerListComponent,
    StudentAnswerEditComponent,
    ConfereceListComponent,
    ConfereceEditComponent,
  ],
})
export class DashboardModule { }
