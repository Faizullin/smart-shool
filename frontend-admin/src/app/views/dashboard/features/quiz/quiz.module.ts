import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import {
  AvatarModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  ProgressModule,
  TabsModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from 'src/app/views/widgets/widgets.module';
import { ModalModule as BsModalModule } from 'ngx-bootstrap/modal';
import { FilterableMultiselectModule } from '../../shared/components/filterable-multiselect/filterable-multiselect.module';
import { SmartTableModule } from '../../shared/components/tables/smart-table.module';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { OpenEndedFormComponent } from './forms/open-ended-form/open-ended-form.component';
import { ClosedEndedFormComponent } from './forms/closed-ended-form/closed-ended-form.component';
import { DraggableFormComponent } from './forms/draggable-form/draggable-form.component';
import { BaseModule } from '../../shared/components/base-component/base.module';

const routes: Routes = [
  {
    path: 'list',
    component: QuizListComponent,
    data: {
      title: $localize`Quizzes`,
    },
  },
];

@NgModule({
  declarations: [
    QuizListComponent,
    QuizEditComponent,
    OpenEndedFormComponent,
    ClosedEndedFormComponent,
    DraggableFormComponent,
  ],
  imports: [
    CommonModule,
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
    AvatarModule,
    WidgetsModule,
    ModalModule,
    BsModalModule.forRoot(),
    SmartTableModule,
    FilterableMultiselectModule,
    RouterModule.forChild(routes),
    BaseModule,
  ],
})
export class QuizModule {}
