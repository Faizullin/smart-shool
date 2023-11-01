import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private userService: UserService,
    fb: FormBuilder,
    modalService: BsModalService,
    http: HttpClient,
  ) {
    super(fb, modalService, http);
  }

  override ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: [''],
      roles: [],
    });
    super.ngOnInit();
  }

  override fetchInstanceRequest(item_id: number) {
    return this.userService.getUser(item_id);
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
