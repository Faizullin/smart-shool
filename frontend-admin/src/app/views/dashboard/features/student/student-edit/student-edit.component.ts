import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { Student } from '../student';
import { map } from 'rxjs';

@Component({
  selector: 'dashboard-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent extends BaseEditComponent {
  public override action_urls = {
    post: () => `/api/s/students/`,
    detail: (id: number) => `/api/s/students/${id}/`,
  };
  public override editInstance: Student | null = null;
  override ngOnInit(): void {
    this.form = this.fb.group({
      subject_group: [[]],
    });
    super.ngOnInit();
  }
  override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        subject_group: data.current_group ? [data.current_group] : [],
      });
    }
  }
  protected override getPreparedEditData(data: any): Object {
    if (data.subject_group.length > 0) {
      data.current_group_id = data.subject_group[0].id;
    }
    delete data.subject_group;
    return data;
  }
  public fetchFilterRequest = {
    subject_groups: (filters?: any) => {
      return this.http
        .get(`/api/s/subject-groups`, {
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
}
