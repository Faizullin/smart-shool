import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { Feedback } from './../feedback';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-feedback-edit',
  templateUrl: './feedback-edit.component.html',
  styleUrls: ['./feedback-edit.component.scss'],
})
export class FeedbackEditComponent extends BaseEditComponent {
  public override action_urls = {
    detail: (id: number) => `/api/s/feedbacks/${id}/`,
    post: () => `/api/s/feedbacks/`,
    delete: (id: number) => `/api/s/feedbacks/${id}/`,
  };
  public override editInstance: Feedback | null = null;
  override ngOnInit(): void {
    this.form = this.fb.group({
      content: ['', Validators.required],
      result: [[], Validators.required],
    });
    const initialState = this.modalService.config.initialState as any;
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    } else {
      this.patchFormValue();
    }
  }
  public paraphraseFeedback() {
    const content = this.form.get('content')?.value;
    const prompt = "Paraphrase this content: " + content;
    this.http
      .post(`/api/s/feedbacks/paraphrase`, { prompt })
      .subscribe({
        next: (response: any) => {
          this.form.patchValue({
            content: response.data,
          });
        },
      });
  }
  protected override patchFormValue(data?: any): void {
    if (this.editInstance !== null) {
      this.form.patchValue({
        content: this.editInstance.content,
        result: this.editInstance.result ? [this.editInstance.result] : [],
      });
    } else {
      const initialState = this.modalService.config.initialState as any;
      this.form.patchValue({
        content: '',
        result: initialState?.initial_data?.result_instance
          ? [initialState.initial_data?.result_instance]
          : [],
      });
    }
  }
  protected override getPreparedEditData(data: any): Object {
    data.result_id = data.result?.length > 0 ? data.result[0].id : null;
    return { ...data };
  }
  public getResultFilterTextField(item: any) {
    return `${item?.id} - ${item?.student?.user?.username}`;
  }
  public fetchFilterRequest = {
    results: (filters?: any) => {
      return this.http
        .get(`/api/s/results/`, {
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
  protected override afterRequestError(error: any): void {
    if (error.status == 500) {
      alert('Error 500: comething went wrong!');
    }
    super.afterRequestError(error);
  }
  public onFeedbackDelete() {
    if (this.editInstance !== null) {
      this.loading.post = true;
      this.http
        .delete(this.action_urls.delete(this.editInstance.id))
        .subscribe({
          next: (response) => {
            this.editInstance = null;
            this.form.reset();
            this.loading.post = false;
          },
          error: (error) => {
            this.loading.post = false;
          },
        });
    }
  }
}
