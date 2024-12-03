import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToasterComponent } from '@coreui/angular';
import { BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';
import { LoadingState } from 'src/app/core/models/loading-state';
import { AppToastComponent } from 'src/app/views/notifications/toasters/toast-simple/toast.component';

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
  ) { }

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
  protected patchFormValue(data: any) { }
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


  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;
  protected afterRequestSuccess(item_data: any) {
    this.loading.post = false;
    this.validationErrors = {};
    this.fetchInstance(item_data.id);
    this.showToastNotification("success", {
      title: "VSuccessfully saved.",
    });
  }




  // eidt
  public showToastNotification(state: "success" | "error", {
    title,
    description,
  }: {
    title?: string;
    description?: string;
  }) {
    console.log("showToastNotification", state, title, description)
    const placement = "top-end"
    const toasterPosition = this.viewChildren.filter(
      (item) => item.placement === placement,
    );
    console.log(toasterPosition,  this.viewChildren)
    toasterPosition.forEach((item) => {
      const props = {
        title,
        color: state === "success" ? "success" : "danger",
        autohide: true,
      }
      const componentRef = item.addToast(AppToastComponent, props, {});
      // componentRef.instance['closeButton'] = props.closeButton;
    });
  }





  protected afterRequestError(error: any) {
    this.loading.post = false;
    if (error.status == 400 || error.status == 422) {
      const errors = { ...error.error };
      this.validationErrors = errors;
      this.showToastNotification("error", {
        title: "Validation error.",
      });
    } else {
      this.showToastNotification("error", {
        title: "Something went wrong.",
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
  protected onSave(): void {
    if (this.form.valid) {
      this.fetchSave(this.getPreparedEditData(this.form.value));
    } else {
      this.form.markAllAsTouched();
    }
  }
  protected getPreparedEditData(data: any): Object {
    return data;
  }

}
