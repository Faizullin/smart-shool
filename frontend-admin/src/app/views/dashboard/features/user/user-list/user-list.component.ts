import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/base-component/base-list/base-list.component';
import { UserEditComponent } from './../user-edit/user-edit.component';
import { User } from '../user';

@Component({
  selector: 'dashboard-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent<User> extends BaseListComponent<User> {
  public override table_title = 'Users';
  public override action_urls = {
    list: () => `/api/s/users/`,
  };

  override openEditModal(initialState: any) {
    this.bsModalRef = this.modalService.show(UserEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
