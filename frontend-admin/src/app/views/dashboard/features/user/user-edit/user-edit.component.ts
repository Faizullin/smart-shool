import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';

// interface IFilters {
//   tags: Role[]
// }

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent extends BaseEditComponent {
  public override editInstance: User | null = null;
  override action_urls = {
    post: () => `/api/s/users/`,
    detail: (id: number) => `/api/s/users/${id}/`,
  };

  override ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: [''],
      roles: [],
    });
    super.ngOnInit();
  }
  override patchFormValue() {
    if (this.editInstance !== null) {
      this.form.patchValue({
        username: this.editInstance.username,
        email: this.editInstance.email,
      });
    }
  }
  public onLoginAs() {
    if (this.editInstance) {
    }
  }
}
