import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { ISubjectGroup } from '../subject-group';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-subject-group-edit',
  templateUrl: './subject-group-edit.component.html',
  styleUrls: ['./subject-group-edit.component.scss'],
})
export class SubjectGroupEditComponent extends BaseEditComponent {
  public override editInstance: ISubjectGroup | null = null;
  public override action_urls = {
    post: () => `/api/s/subject-groups/`,
    detail: (id: number) => `/api/s/subject-groups/${id}/`,
  };
  override ngOnInit(): void {
    super.ngOnInit();
    this.form = this.fb.group({
      title: [''],
      subject: [[]],
    });
  }
  override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        title: this.editInstance.title,
      });
    }
  }
}
