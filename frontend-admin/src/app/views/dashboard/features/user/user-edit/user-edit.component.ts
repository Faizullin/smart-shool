import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';

// interface IFilters {
//   tags: Role[]
// }

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  public form!: FormGroup;
  public fileForm!: FormGroup;
  public validationErrors: {
    [key: string]: any;
  } = {};
  public questionForm!: FormGroup;
  public editInstance: User | null = null;
  // public current_filters: IFilters = {
  //   roles: []
  // }
  // public current_selected_filters: IFilters = {
  //   roles: []
  // }
  // public multiselectRoleDropdownSettings: IDropdownSettings = {
  //   singleSelection: false,
  //   idField: 'id',
  //   textField: 'username',
  //   selectAllText: 'Select All',
  //   unSelectAllText: 'UnSelect All',
  //   itemsShowLimit: 3,
  //   allowSearchFilter: true
  // };
  public previewFiles: {
    [key: string]: any;
  } = {};

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: [''],
      roles: [],
    });
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    }
  }
  get formControl() {
    return this.form.controls;
  }

  private fetchInstance(id?: number) {
    const item_id = this.editInstance !== null ? this.editInstance.id : id!;
    return this.userService.getUser(item_id).subscribe({
      next: (user) => {
        this.editInstance = { ...user } as User;
        this.form.patchValue({
          username: this.editInstance.username,
          email: this.editInstance.email,
          // tags: this.editInstance.tags || [],
        });
      },
    });
  }
  onRoleItemSelect(item: any) {}
  onRoleSelectAll(items: any) {}
  onSave() {
    if (this.form.valid) {
      const data = this.form.value;
      if (this.editInstance) {
        this.userService.updateUser(this.editInstance.id, data).subscribe({
          next: (user) => {
            this.validationErrors = {};
            this.fetchInstance(user.id);
          },
          error: (error) => {
            if (error.status == 400 || error.status == 422) {
              const errors = { ...error.error };
              this.validationErrors = errors;
            }
          },
        });
      } else {
        this.userService.createUser(data).subscribe({
          next: (user) => {
            this.fetchInstance(user.id);
          },
          error: (error) => {
            if (error.status == 400 || error.status == 422) {
              const errors = { ...error.error };
              this.validationErrors = errors;
            }
          },
        });
      }
    }
  }
  public onLoginAs() {
    if (this.editInstance) {
    }
  }
}
