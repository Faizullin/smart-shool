import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { Certificate } from '../certificate';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'dashboard-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.scss'],
})
export class CertificateEditComponent extends BaseEditComponent {
  public override action_urls = {
    post: () => `/api/s/certificates/`,
    detail: (id: number) => `/api/s/certificates/${id}/`,
  };
  public override editInstance: Certificate | null = null;

  override ngOnInit(): void {
    this.form = this.fb.group({
      student: [[], Validators.required],
      subject: [[], Validators.required],
      generate_file: [false],
    });
    super.ngOnInit();
  }
  override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        student: this.editInstance.student ? [this.editInstance.student] : [],
        subject: this.editInstance.subject ? [this.editInstance.subject] : [],
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
    students: (filters?: any) => {
      return this.http
        .get(`/api/s/students`, {
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
    data.student_id = data.student?.length > 0 ? data.student[0].id : null;
    if (data.subject?.length) {
      data.subject_id = data.subject[0].id;
    }
    delete data.student;
    delete data.subject;
    data = { ...data };
    return data;
  }
  public getStudentFilterTextField(item: any) {
    return `${item?.id} - ${item?.user?.username}`;
  }
}
