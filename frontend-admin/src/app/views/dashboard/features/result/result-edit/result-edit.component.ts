import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { Result } from '../result';
import { Validators } from '@angular/forms';

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
      total_score: [0],
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
}
