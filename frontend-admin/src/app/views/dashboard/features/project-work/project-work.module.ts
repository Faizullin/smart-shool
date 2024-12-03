import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectWorkListComponent } from './project-work-list/project-work-list.component';
import { ProjectWorkViewComponent } from './project-work-view/project-work-view.component';
import { IconModule } from '@coreui/icons-angular';
import {
  AlertModule,
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmartTableModule } from '../../shared/components/tables/smart-table.module';
import { FilterableMultiselectModule } from '../../shared/components/filterable-multiselect/filterable-multiselect.module';
import { BaseModule } from '../../shared/components/base-component/base.module';

const routes: Routes = [
  {
    path: 'list',
    component: ProjectWorkListComponent,
    data: {
      title: $localize`Projects`,
    },
  },
  {
    path: 'view',
    component: ProjectWorkViewComponent,
    data: {
      title: $localize`Project View`,
    },
  },
];

@NgModule({
  imports: [
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ButtonModule,
    AvatarModule,
    ModalModule,
    FormModule,
    FormsModule,
    BsModalModule.forRoot(),
    SmartTableModule,
    FilterableMultiselectModule,
    RouterModule.forChild(routes),
    NgFor,
    ReactiveFormsModule,
    CardModule,
    GridModule,
    BadgeModule,
    AlertModule,
    BaseModule,
  ],
  declarations: [ProjectWorkListComponent, ProjectWorkViewComponent],
})
export class ProjectWrokModule {}
