import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ArticleListComponent } from './features/article/article-list/article-list.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { ResultListComponent } from './features/result/result-list/result-list.component';
import { CertificateListComponent } from './features/certificate/certificate-list/certificate-list.component';
import { StudentListComponent } from './features/student/student-list/student-list.component';
import { ExamListComponent } from './features/exam/exam-list/exam-list.component';
import { QuizListComponent } from './features/quiz/quiz-list/quiz-list.component';
import { SubjectListComponent } from './features/subject/subject-list/subject-list.component';

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
    component: ArticleListComponent,
    data: {
      title: $localize`Article`,
    },
  },
  {
    path: 'exams',
    component: ExamListComponent,
    data: {
      title: $localize`Exams`,
    },
  },
  {
    path: 'quizzes',
    component: QuizListComponent,
    data: {
      title: $localize`Quizzes`,
    },
  },
  {
    path: 'results',
    component: ResultListComponent,
    data: {
      title: $localize`Results`,
    },
  },
  {
    path: 'certificates',
    component: CertificateListComponent,
    data: {
      title: $localize`Certificates`,
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
    path: 'subject-groups',
    loadChildren: () =>
      import('./features/subject-group/subject-group.module').then(
        (m) => m.SubjectGroupModule,
      ),
    data: {
      title: $localize`Subject Groups`,
    },
  },
  {
    path: 'subjects',
    component: SubjectListComponent,
    data: {
      title: $localize`Subjects`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
