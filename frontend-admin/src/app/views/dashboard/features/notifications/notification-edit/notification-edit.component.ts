import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { Notification } from '../notification';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.scss'],
})
export class NotificationEditComponent extends BaseEditComponent {
  public override editInstance: Notification | null = null;
  public override action_urls = {
    post: () => `/api/s/notifications/`,
    detail: (id: number) => `/api/s/notifications/${id}/`,
  };
  override ngOnInit(): void {
    this.form = this.fb.group({
      recipient: ['', Validators.required],
      level: ['info', Validators.required],
      verb: ['info', Validators.required],
      description: [''],
    });
    super.ngOnInit();
  }
  override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        recipient: this.editInstance.recipient
          ? [this.editInstance.recipient]
          : [],
        level: this.editInstance.level,
        verb: this.editInstance.verb,
        description: this.editInstance.description,
      });
    }
  }
  protected override getPreparedEditData(data: any): Object {
    data.recipient_id =
      data.recipient?.length > 0 ? data.recipient[0].id : null;
    return { ...data };
  }
  public fetchFilterRequest = {
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
