import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { ISubjectGroup } from '../subject-group';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';

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
    this.form = this.fb.group({
      title: [''],
      subject: [[], Validators.required],
      teacher: [[], Validators.required],
    });
    super.ngOnInit();
  }
  override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        title: this.editInstance.title,
        subject: this.editInstance.subject ? [this.editInstance.subject] : [],
        teacher: this.editInstance.teacher ? [this.editInstance.teacher] : [],
      });
    }
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
    teachers: (filters?: any) => {
      return this.http
        .get(`/api/s/users?groups__name=teacher`, {
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
  protected override getPreparedEditData(data: any) {
    data.teacher_id = data.teacher?.length > 0 ? data.teacher[0].id : null;
    data.subject_id = data.subject?.length > 0 ? data.subject[0].id : null;
    return data;
  }
}
