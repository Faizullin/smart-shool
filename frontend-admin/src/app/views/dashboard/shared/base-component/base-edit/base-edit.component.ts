import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';

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
    return this.fetchInstanceRequest(item_id).subscribe({
      next: (data) => {
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
    if (item_id !== undefined) {
      this.fetchUpdateRequest(item_id, data).subscribe({
        next: (article) => {
          this.validationErrors = {};
          this.fetchInstance(article.id);
        },
        error: (error) => {
          if (error.status == 400 || error.status == 422) {
            const errors = { ...error.error };
            this.validationErrors = errors;
          }
        },
      });
    } else {
      this.fetchCreateRequest(data).subscribe({
        next: (article) => {
          this.validationErrors = {};
          this.fetchInstance(article.id);
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
  public onSave(): void {
    if (this.form.valid) {
      this.fetchSave(this.form.value);
    }
  }
}
