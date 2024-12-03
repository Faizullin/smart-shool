import { CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  ProgressModule,
  SpinnerModule,
  TabsModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ModalModule as BsModalModule } from 'ngx-bootstrap/modal';
import { FilterableMultiselectModule } from '../../shared/components/filterable-multiselect/filterable-multiselect.module';
import { SmartTableModule } from '../../shared/components/tables/smart-table.module';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorComponent, EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { BaseModule } from './../../shared/components/base-component/base.module';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { DocumentEditFormComponent } from './document-edit-form/document-edit-form.component';
import { DocumentFileEditComponent } from './document-file-edit/document-file-edit.component';
import { EditFileUploadComponent } from './edit-file-upload/edit-file-upload.component';

const routes: Routes = [
  {
    path: 'list',
    component: ArticleListComponent,
    data: {
      title: $localize`Articles`,
    },
  },
  {
    path: ':id/edit',
    component: ArticleEditComponent,
    data: {
      title: $localize`Articles Edit`,
    },
  },
  {
    path: 'edit',
    component: ArticleEditComponent,
    data: {
      title: $localize`Articles Edit`,
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
    NgbNavModule,
    ButtonGroupModule,
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
    SpinnerModule,
    BaseModule,
    EditorModule,
  ],
  declarations: [
    ArticleEditComponent,
    ArticleListComponent,
    DocumentEditFormComponent,
    DocumentFileEditComponent,
    EditFileUploadComponent,
  ],
  providers: [
    // If you're self hosting and lazy loading TinyMCE from node_modules:
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
})
export class ArticleModule { }
