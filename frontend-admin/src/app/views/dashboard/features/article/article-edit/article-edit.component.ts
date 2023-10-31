import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/core/services/article.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileContentService } from 'src/app/core/services/file-content.service';
import { BaseEditComponent } from '../../../shared/base-component/base-edit/base-edit.component';
import { HttpClient } from '@angular/common/http';
import { Article } from './../article';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent extends BaseEditComponent {
  public override action_urls = {
    detail: (id: number) => `/api/s/articles/${id}/`,
    post: () => `/api/s/articles/`,
  };
  public override editInstance: Article | null = null;

  constructor(
    private articleService: ArticleService,
    private fileService: FileContentService,
    fb: FormBuilder,
    modalService: BsModalService,
    http: HttpClient,
  ) {
    super(fb, modalService, http);
  }

  override ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: [''],
      subjects: [[]],
    });
    this.fileForm = this.fb.group({
      file: [null],
    });
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    }
  }
  public fileForm!: FormGroup;

  public previewFiles: {
    [key: string]: any;
  } = {};
  public Editor = ClassicEditor;

  protected override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        title: this.editInstance.title,
        content: this.editInstance.content,
        subjects: this.editInstance.subject ? [this.editInstance.subject] : [],
      });
      this.fileForm.patchValue({
        file: this.editInstance.file?.url || null,
        featured_image: this.editInstance.featured_image?.url || null,
      });
    }
  }
  protected override fetchInstanceRequest(id: number) {
    return this.articleService.getArticle(id);
  }
  override onSave() {
    if (this.form.valid) {
      const data = this.form.value;
      data['subject_id'] =
        data.subjects.length > 0 ? data.subjects[0].id : null;
      this.fetchSave(data)
    }
  }
  onFileSave() {
    if (this.fileForm.valid) {
      const data = this.fileForm.value;
      if (this.editInstance) {
        this.uploadFile(data.file).subscribe({
          next: (file) => {
            if (this.editInstance) {
              this.articleService
                .updateArticle(this.editInstance.id, {
                  file_id: file.id,
                })
                .subscribe({
                  next: () => {
                    this.fetchInstance();
                  },
                });
            }
          },
          error: (error) => {
            if (error.status == 400 || error.status == 422) {
              const errors = { ...error.error };
              this.validationErrors = errors;
            }
          },
        });
      }
    }
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        file: file,
      });
    }
  }
  onFeaturedImageChange(event: any) {
    if (event.target.files.length > 0 && this.editInstance) {
      const file = event.target.files[0];
      this.uploadFile(file).subscribe({
        next: (file) => {
          if (this.editInstance) {
            this.articleService
              .updateArticle(this.editInstance.id, {
                featured_image_id: file.id,
              })
              .subscribe({
                next: () => {
                  this.fetchInstance();
                },
              });
          }
        },
      });
    }
  }
  uploadFile(file: File) {
    return this.fileService.uploadNewFile(file);
  }
}
