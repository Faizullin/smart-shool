import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { ISubject } from '../subject';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss'],
})
export class SubjectEditComponent extends BaseEditComponent {
  public override editInstance: ISubject | null = null;
  public override action_urls = {
    post: () => `/api/s/subjects/`,
    detail: (id: number) => `/api/s/subjects/${id}/`,
  };
  override ngOnInit(): void {
    super.ngOnInit();
    this.form = this.fb.group({
      title: ['', Validators.required],
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
