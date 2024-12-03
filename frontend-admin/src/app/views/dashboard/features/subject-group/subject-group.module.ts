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
  ProgressModule,
  TabsModule,
} from '@coreui/angular';
import { FilterableMultiselectModule } from '../../shared/components/filterable-multiselect/filterable-multiselect.module';
import { WidgetsModule } from 'src/app/views/widgets/widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { BaseModule } from '../../shared/components/base-component/base.module';

const routes: Routes = [
  {
    path: 'list',
    component: SubjectGroupListComponent,
    data: {
      title: $localize`Subject Groups`,
    },
  },
  {
    path: 'assign',
    component: SubjectGroupAssignComponent,
    data: {
      title: $localize`Subject Groups Assign`,
    },
  },
];

@NgModule({
  declarations: [
    SubjectGroupListComponent,
    SubjectGroupEditComponent,
    SubjectGroupAssignComponent,
  ],
  imports: [
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
    FilterableMultiselectModule,
    RouterModule.forChild(routes),
    DragDropModule,
    CdkDropListGroup,
    CdkDropList,
    NgFor,
    CdkDrag,
    BaseModule,
  ],
})
export class SubjectGroupModule {}
