import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { HttpClient } from '@angular/common/http';
import { Article } from './../article';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FileContent } from 'src/app/core/models/file-content';

const STORAGE_TAB_INDEX_KEY = 'TAB_INDEX_KEY';

@Component({
  selector: 'dashboard-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent extends BaseEditComponent {
  public tab_index = 1;
  public override action_urls = {
    detail: (id: number) => `/api/s/articles/${id}/`,
    post: () => `/api/s/articles/`,
  };
  public override editInstance: Article | null = null;

  constructor(
    fb: FormBuilder,
    modalService: BsModalService,
    http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super(fb, modalService, http);
  }
  public previewFiles: {
    [key: string]: any;
  } = {};

  override ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      subject: [[]],
    });
    this.activatedRoute.params.subscribe((params) => {
      const itemId = params['id'];
      if (itemId) {
        this.fetchInstance(itemId);
        if (itemId) {
          const storage_tab_index =
            localStorage.getItem(STORAGE_TAB_INDEX_KEY) || null;
          this.tab_index =
            storage_tab_index === null ? 1 : Number(storage_tab_index);
        }
      }
    });
  }
  protected override afterRequestSuccess(item_data: any) {
    this.loading.post = false;
    this.validationErrors = {};
    if (this.editInstance === null) {
      this.router.navigate([
        '/',
        'dashboard',
        'articles',
        item_data.id,
        'edit',
      ]);
    } else {
      this.fetchInstance(item_data.id);
    }
  }
  protected override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        title: this.editInstance.title,
        subject: this.editInstance.subject ? [this.editInstance.subject] : [],
      });
    }
  }
  protected override getPreparedEditData(data: any) {
    data['subject_id'] = data.subject.length > 0 ? data.subject[0].id : null;
    return data;
  }
  public fetchFilterRequest = {
    subjects: (filters?: any) => {
      return this.http
        .get(`/api/s/subjects`, {
          params: {
            ...filters,
          },
        })
        .pipe(
          map((data: any) => {
            const data_results = data.results || [];
            return data_results;
          }),
        );
    },
  };
  public onTabIndexChange(tab_index: number) {
    localStorage.setItem(STORAGE_TAB_INDEX_KEY, tab_index.toString());
  }
  public onDocumentCreate(document: any) {
    if (document) {
      this.fetchInstance();
    }
  }
  public onFeaturedImageChange(event: any) {
    if (event.target.files.length > 0 && this.editInstance) {
      const file = event.target.files[0];
      this.uploadFileRequest(file).subscribe({
        next: (value) => {
          this.loading.list = false;
          this.loading.post = false;
          this.fetchInstance();
        },
      });
    }
  }
  public uploadFileRequest(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'featured_image');
    return this.http
      .post<any>(`/api/s/articles/${this.editInstance?.id}/files/`, formData)
      .pipe(
        map((data: any) => {
          return {
            ...data.data,
          } as FileContent;
        }),
      );
  }
  public deleteFile(file: FileContent) {
    return this.http
      .delete<any>(`/api/s/articles/${this.editInstance?.id}/files/${file.id}`)
      .subscribe({
        next: () => {
          this.fetchInstance();
        },
      });
  }
}
