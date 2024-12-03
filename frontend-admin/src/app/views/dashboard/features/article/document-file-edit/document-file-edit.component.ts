import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { FileContent } from 'src/app/core/models/file-content';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { Article } from '../article';

@Component({
  selector: 'dashboard-document-file-edit-form',
  templateUrl: './document-file-edit.component.html',
  styleUrls: ['./document-file-edit.component.scss'],
})
export class DocumentFileEditComponent extends BaseEditComponent {
  @Input() articleInstance: Article | null = null;
  @ViewChild('fileInput') fileInputElement!: ElementRef;
  public override action_urls = {
    detail: (id: number) => `/api/s/articles/${id}/`,
  };
  public override editInstance: Article | null = null;
  public previewFiles: {
    [key: string]: any;
  } = {};

  override ngOnInit(): void {
    if (this.articleInstance) {
      this.fetchInstance(this.articleInstance.id);
    }
  }
  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (this.editInstance) {
        this.validationErrors = {};
        this.loading.post = true;
        this.uploadFileRequest(file).subscribe({
          next: (file) => {
            this.fileInputElement.nativeElement.value = '';
            this.afterRequestSuccess(file);
          },
          error: (error) => {
            this.fileInputElement.nativeElement.value = '';
            this.afterRequestError(error);
          },
        });
      }
    }
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
            ...data.data,
          } as FileContent;
        }),
      );
  }
  public deleteFile(event: any, file: FileContent) {
    event?.preventDefault();
    return this.http
      .delete<any>(
        `/api/s/articles/${this.articleInstance!.id}/files/${file.id}`,
      )
      .subscribe({
        next: () => {
          this.fetchInstance();
        },
      });
  }
  public fileType(obj: FileContent) {
    if ([".jpg", ".jpeg", ".png"].includes(obj.extension)) {
      return "image";
    }
    return null;
  }
}
