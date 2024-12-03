import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Conference } from './../conference';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'dashboard-conferece-edit',
  templateUrl: './conferece-edit.component.html',
  styleUrls: ['./conferece-edit.component.scss'],
})
export class ConfereceEditComponent extends BaseEditComponent {
  public override action_urls = {
    detail: (id: number) => `/api/s/conferences/${id}/`,
    post: () => `/api/s/conferences/`,
  };
  public override editInstance: Conference | null = null;
  public status_types = [
    { value: 'planned', label: 'Planned' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
  ];
  constructor(
    fb: FormBuilder,
    modalService: BsModalService,
    http: HttpClient,
    private authStorageService: AuthStorageService,
  ) {
    super(fb, modalService, http);
  }
  override ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    const user = this.authStorageService.getUser();
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [this.status_types[0].value],
      users: [[user]],
      admin: [[user]],
      invited_users: [[]],
      planned_time: [''],
      project_work: [[]],
    });
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    }
    this.form.get('users')!.valueChanges.subscribe((newValue) => {
      if (newValue.length > 0) {
        const newValue_ids = newValue.map((item: any) => item.id);
        const new_invited_users = [...this.form.get('invited_users')!.value];
        const new_invited_users_excluded = new_invited_users.filter(
          (item: any) => !newValue_ids.includes(item.id),
        );
        newValue.forEach((element: any) => {
          new_invited_users_excluded.push(element);
        });
        this.form.patchValue({
          invited_users: new_invited_users_excluded,
        });
      }
    });
  }
  protected override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        title: this.editInstance.title,
        description: this.editInstance.description,
        status:
          this.status_types.find(
            (item) => item.value === this.editInstance?.status,
          )?.value || 'planned',
        admin: this.editInstance.admin ? [this.editInstance.admin] : [],
        users: this.editInstance.users || [],
        invited_users: this.editInstance.invited_users || [],
        planned_time: this.editInstance.planned_time,
        project_work: this.editInstance.project_work
          ? [this.editInstance.project_work]
          : [],
      });
    }
  }
  protected override getPreparedEditData(data: any): Object {
    const submit_data = { ...data };
    submit_data['users_ids'] = submit_data.users.map((item: any) => item.id);
    delete submit_data.users;
    submit_data['invited_users_ids'] = submit_data.invited_users.map(
      (item: any) => item.id,
    );
    delete submit_data.invited_users;
    submit_data['admin_id'] =
      submit_data.admin.length > 0 ? submit_data.admin[0].id : null;
    delete submit_data.admin;
    submit_data['project_work_id'] =
      submit_data.project_work.length > 0
        ? submit_data.project_work[0].id
        : null;
    delete submit_data.project_work;
    if (submit_data.planned_time) {
      submit_data.planned_time = submit_data.planned_time as string;
      // .replace('T', ' ')
      // .replaceAll('-', '/');
    }
    return submit_data;
  }
  public fetchFilterRequest = {
    project_works: (filters?: any) => {
      return this.http
        .get(`/api/s/project-works/`, {
          params: {
            ...filters,
            has_conference: false,
          },
        })
        .pipe(
          map((data: any) => {
            const data_results = data.results || [];
            return data_results;
          }),
        );
    },
    users: (filters?: any) => {
      return this.http
        .get(`/api/s/users/`, {
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
