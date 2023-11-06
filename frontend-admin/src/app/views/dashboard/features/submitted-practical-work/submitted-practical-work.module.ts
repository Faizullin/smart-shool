import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedPracticalWorkListComponent } from './submitted-practical-work-list/submitted-practical-work-list.component';
import { SubmittedPracticalWorkEditComponent } from './submitted-practical-work-edit/submitted-practical-work-edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SubmittedPracticalWorkListComponent,
    // data: {
    //   title: $localize`Subject Groups`,
    // },
  },
  {
    path: 'test',
    component: SubmittedPracticalWorkEditComponent,
    // data: {
    //   title: $localize`Subject Groups`,
    // },
  },
  // {
  //   path: 'list',
  //   component: SubjectGroupListComponent,
  //   data: {
  //     title: $localize`Subject Groups`,
  //   },
  // },
  // {
  //   path: 'assign',
  //   component: SubjectGroupAssignComponent,
  //   data: {
  //     title: $localize`Subject Groups Assign`,
  //   },
  // },
];

@NgModule({
  declarations: [
    SubmittedPracticalWorkListComponent,
    SubmittedPracticalWorkEditComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SubmittedPracticalWorkModule {}
