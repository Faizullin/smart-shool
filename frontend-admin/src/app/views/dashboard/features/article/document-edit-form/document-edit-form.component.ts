import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { Article } from '../article';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { FileContent } from 'src/app/core/models/file-content';

interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}
type ProgressFn = (percent: number) => void;
type UploadHandler = (blobInfo: BlobInfo, progress: ProgressFn) => Promise<string>;

@Component({
  selector: 'dashboard-document-edit-form',
  templateUrl: './document-edit-form.component.html',
  styleUrls: ['./document-edit-form.component.scss'],
})
export class DocumentEditFormComponent extends BaseEditComponent {

  @Input() articleInstance: Article | null = null;
  @Output() onDocumentCreate: EventEmitter<any> = new EventEmitter<any>();
  public override action_urls = {
    detail: (id: number) => `/api/s/articles/${id}/content/`,
  };
  init: EditorComponent['init'] = {}
  constructor(
    fb: FormBuilder,
    modalService: BsModalService,
    http: HttpClient,
  ) {
    super(fb, modalService, http)
    this.init = {
      plugins: 'lists link image table code help wordcount advcode ',
      toolbar: 'undo redo | image code | lists link align',
      license_key: "gpl",
      promotion: false,
      images_file_types: 'jpg,svg,webp',
      file_picker_types: 'image media',
      images_reuse_filename: true,
      images_upload_handler: this.imagesUploadHandler,
    };
  }
  imagesUploadHandler: UploadHandler = (blobInfo) => {
    const file = blobInfo.blob();
    const filePath = `${Date.now()}-${blobInfo.filename()}`;
    return  new Promise<string>((resolve, reject) => {
       this.uploadFileRequest(file as File).subscribe({
        next: (value) => {
          resolve(value.url)
        },
        error: (err) => {
            reject(err)
        },
      })      
    });
    // const ref = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, file);
    // const promise = new Promise<string>((resolve, reject) => {
    //   task
    //     .snapshotChanges()
    //     .pipe(
    //       finalize(() =>
    //         ref
    //           .getDownloadURL()
    //           .pipe(last())
    //           .subscribe((url) => {
    //             resolve(url);
    //           })
    //       )
    //     )
    //     .subscribe((_) => {
    //       // do nothing
    //     });
    // });
    // return promise;
  }
  public uploadFileRequest(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'attach');
    return this.http
      .post<any>(`/api/s/articles/${this.articleInstance!.id}/files/`, formData)
      .pipe(
        map((data: any) => {
          return {
            ...data,
          } as FileContent;
        }),
      );
  }
  override ngOnInit(): void {
    this.form = this.fb.group({
      content: [''],
    });
    if (this.articleInstance) {
      this.fetchInstance(this.articleInstance.id);
    }
  }
  protected override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        content: this.editInstance.content,
      });
    }
  }
  public createInstance() {
    if (!this.editInstance && this.articleInstance) {
      this.loading.list = true;
      this.loading.post = true;
      this.http
        .post(`/api/s/articles/${this.articleInstance.id}/`, {
          title: 'Document for ' + this.articleInstance?.title,
          article: this.articleInstance.id,
        })
        .subscribe({
          next: (value: any) => {
            this.loading.list = false;
            this.loading.post = false;
            this.editInstance = value.data;
            this.patchFormValue(value.data);
            this.onDocumentCreate.emit(value.data);
          },
        });
    }
  }
  public deleteInstance() {
    if (this.editInstance && this.articleInstance) {
      this.loading.list = true;
      this.loading.post = true;
      this.http
        .delete(`/api/s/articles/${this.articleInstance.id}/`)
        .subscribe({
          next: (value) => {
            this.loading.list = false;
            this.loading.post = false;
            this.editInstance = null;
            this.form.reset();
            window.location.reload();
          },
        });
    }
  }





  // onUploadComplete(result: any): void {
  //   // console.log('Upload completed:', result);
  // }
  // public onReady(editor: ClassicEditor): void {
  //   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
  //     return new EditFileUploadAdapter(loader, this.articleInstance!, this.http);
  //   };
  // }
}
