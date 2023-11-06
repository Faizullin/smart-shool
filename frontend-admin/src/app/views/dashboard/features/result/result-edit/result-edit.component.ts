import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { Result } from 'src/app/core/models/result';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-result-edit',
  templateUrl: './result-edit.component.html',
  styleUrls: ['./result-edit.component.scss'],
})
export class ResultEditComponent extends BaseEditComponent {
  public override action_urls = {
    detail: (id: number) => `/api/s/results/${id}/`,
    post: () => `/api/s/results/`,
  };
  public override editInstance: Result | null = null;
  override ngOnInit(): void {
    this.form = this.fb.group({
      total_score: [0, Validators.required],
      theory_score: [0, Validators.required],
      practical_score: [0, Validators.required],
      checked: [false],
    });
    super.ngOnInit();
  }
  protected override patchFormValue(data: any): void {
    if (this.editInstance !== null) {
      this.form.patchValue({
        total_score: this.editInstance.total_score,
        theory_score: this.editInstance.theory_score,
        practical_score: this.editInstance.practical_score,
        checked: this.editInstance.checked,
      });
    }
  }
  public tabIndex: number = 1;
  public onTabPageChange() {
    if (this.tabIndex === 2) {
      this.loading.list = true;
      this.fetchInstanceStatsRequest()
        .pipe(
          map((data) => {
            const label = '';
            const date_x = '';
            const value_y = '';
            return {};
          }),
        )
        .subscribe({
          next: (data) => {
            this.loading.list = false;
            console.log(data);
          },
          error: () => {
            this.loading.list = false;
          },
        });
    }
  }
  private fetchInstanceStatsRequest(filters?: any) {
    return this.http.get(`/api/s/results/${this.editInstance!.id}/stats/`, {
      params: {
        ...filters,
      },
    });
  }
}
