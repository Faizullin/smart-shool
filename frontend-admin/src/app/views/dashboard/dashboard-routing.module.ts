import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SubjectListComponent } from './features/subject/subject-list/subject-list.component';
import { StudentListComponent } from './features/student/student-list/student-list.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { CertificateListComponent } from './features/certificate/certificate-list/certificate-list.component';
import { NotificationListComponent } from './features/notifications/notification-list/notification-list.component';
import { StudentTrainFaceImageListComponent } from './features/student-train-face-image/student-train-face-image-list/student-train-face-image-list.component';
import { StudentAnswerListComponent } from './features/student-answer/student-answer-list/student-answer-list.component';
import { ConfereceListComponent } from './features/conference/conferece-list/conferece-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: $localize`Dashboard`,
    },
  },
  {
    path: 'users',
    component: UserListComponent,
    data: {
      title: $localize`User`,
    },
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./features/article/article.module').then((m) => m.ArticleModule),
  },
  {
    path: 'exams',
    loadChildren: () =>
      import('./features/exam/exam.module').then((m) => m.ExamModule),
  },
  {
    path: 'results',
    loadChildren: () =>
      import('./features/result/result.module').then((m) => m.ResultModule),
  },
  {
    path: 'certificates',
    component: CertificateListComponent,
    data: {
      title: $localize`Certificates`,
    },
  },
  {
    path: 'conferences',
    component: ConfereceListComponent,
    data: {
      title: $localize`Conferences`,
    },
  },
  {
    path: 'students',
    component: StudentListComponent,
    data: {
      title: $localize`Students`,
    },
  },
  {
    path: 'subjects',
    component: SubjectListComponent,
    data: {
      title: $localize`Subjects`,
    },
  },
  {
    path: 'student-answers',
    component: StudentAnswerListComponent,
    data: {
      title: $localize`Student Answers`,
    },
  },
  {
    path: 'subject-groups',
    loadChildren: () =>
      import('./features/subject-group/subject-group.module').then(
        (m) => m.SubjectGroupModule,
      ),
  },
  {
    path: 'project-works',
    loadChildren: () =>
      import('./features/project-work/project-work.module').then(
        (m) => m.ProjectWrokModule,
      ),
  },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('./features/quiz/quiz.module').then((m) => m.QuizModule),
  },
  {
    path: 'notifications',
    component: NotificationListComponent,
    data: {
      title: $localize`Notifications`,
    },
  },
  {
    path: 'student-train-face-image',
    component: StudentTrainFaceImageListComponent,
    data: {
      title: $localize`Notifications`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
