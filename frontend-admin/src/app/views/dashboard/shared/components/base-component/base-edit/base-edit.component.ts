import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';
import { LoadingState } from 'src/app/core/models/loading-state';

@Component({
  template: '',
})
export class BaseEditComponent implements OnInit {
  public action_urls: { [key: string]: Function } = {
    detail: (id: number) => ``,
  };
  public form!: FormGroup;
  public editInstance: any | null = null;
  public validationErrors: {
    [key: string]: any;
  } = {};
  public loading: LoadingState = {
    list: false,
    post: false,
  };

  constructor(
    protected fb: FormBuilder,
    protected modalService: BsModalService,
    protected http: HttpClient,
  ) {}

  ngOnInit(): void {
    const initialState = this.modalService.config.initialState as any;
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    }
  }
  get formControl() {
    return this.form.controls;
  }
  protected fetchInstance(id?: number) {
    const item_id = this.editInstance !== null ? this.editInstance.id : id!;
    this.loading.list = true;
    return this.fetchInstanceRequest(item_id).subscribe({
      next: (data) => {
        this.loading.list = false;
        this.editInstance = data;
        this.patchFormValue(data);
      },
    });
  }
  protected patchFormValue(data: any) {}
  protected fetchInstanceRequest(id: number) {
    return this.http.get(this.action_urls['detail'](id)).pipe(
      map((data: any) => {
        return { ...data };
      }),
    );
  }

  protected fetchSave(data: any) {
    const item_id =
      this.editInstance !== null ? this.editInstance.id : undefined;
    this.loading.post = true;
    if (item_id !== undefined) {
      this.fetchUpdateRequest(item_id, data).subscribe({
        next: (item_data) => {
          this.afterRequestSuccess(item_data);
        },
        error: (error) => {
          this.afterRequestError(error);
        },
      });
    } else {
      this.fetchCreateRequest(data).subscribe({
        next: (item_data) => {
          this.afterRequestSuccess(item_data);
        },
        error: (error) => {
          this.afterRequestError(error);
        },
      });
    }
  }
  protected afterRequestSuccess(item_data: any) {
    this.loading.post = false;
    this.validationErrors = {};
    this.fetchInstance(item_data.id);
  }
  protected afterRequestError(error: any) {
    this.loading.post = false;
    if (error.status == 400 || error.status == 422) {
      const errors = { ...error.error };
      this.validationErrors = errors;
    }
  }
  protected fetchCreateRequest(data: any) {
    return this.http.post(this.action_urls['post'](), data).pipe(
      map((data: any) => {
        return { ...data };
      }),
    );
  }
  protected fetchUpdateRequest(id: number, data: any) {
    return this.http.patch(this.action_urls['detail'](id), data).pipe(
      map((data: any) => {
        return { ...data };
      }),
    );
  }
  protected onSave(): void {
    if (this.form.valid) {
      this.fetchSave(this.getPreparedEditData(this.form.value));
    }
  }
  protected getPreparedEditData(data: any): Object {
    return data;
  }
}
