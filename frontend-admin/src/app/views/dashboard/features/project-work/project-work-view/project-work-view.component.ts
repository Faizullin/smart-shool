import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { ProjectWork } from '../project-work';
import { FileContent } from 'src/app/core/models/file-content';
import { map } from 'rxjs';

interface IDocxFileError {
  label: string;
  messages: string[];
}

@Component({
  selector: 'dashboard-project-work-view',
  templateUrl: './project-work-view.component.html',
  styleUrls: ['./project-work-view.component.scss'],
})
export class ProjectWorkViewComponent extends BaseEditComponent {
  public override action_urls: { [key: string]: Function } = {
    detail: (id: number) => `/api/s/project-works/${id}/`,
    check: (id: number, file_id: number) =>
      `/api/projects/${id}/files/${file_id}/check/`,
  };
  public check_results: IDocxFileError[] = [];
  public override editInstance: ProjectWork | null = null;
  public files: FileContent[] = [];
  public files_to_check: FileContent[] = [];
  protected override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.files = this.editInstance.files || [];
      this.files_to_check = this.files.filter(
        (item) => item.extension === '.docx',
      );
    }
  }
  public onCheckDocxFile(item: FileContent) {
    if (this.editInstance !== null) {
      this.http
        .post(this.action_urls['check'](this.editInstance.id, item.id), {})
        .pipe(
          map((data: any) => {
            return data;
          }),
        )
        .subscribe((data) => {
          this.check_results = data;
        });
    }
  }
  public onProjectOpen() {
    const url = `/dashboard/projects/${this.editInstance!.id}/edit`;
    (window as any).open(url, '_blank').focus();
  }
  public onDownload(url: string) {
    console.log('click', url);
  }
}
