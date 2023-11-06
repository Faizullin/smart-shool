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
import { UserAnswerListComponent } from './features/user_answer/user-answer-list/user-answer-list.component';

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
    path: 'subjects',
    component: SubjectListComponent,
    data: {
      title: $localize`Subjects`,
    },
  },
  {
    path: 'user-answers',
    component: UserAnswerListComponent,
    data: {
      title: $localize`User Answers`,
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
    path: 'submitted-practical-works',
    loadChildren: () =>
      import(
        './features/submitted-practical-work/submitted-practical-work.module'
      ).then((m) => m.SubmittedPracticalWorkModule),
  },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('./features/quiz/quiz.module').then((m) => m.QuizModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
