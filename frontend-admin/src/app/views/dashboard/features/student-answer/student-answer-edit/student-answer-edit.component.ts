import { Component } from '@angular/core';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';
import { StudentAnswer } from '../student-answer';

@Component({
  selector: 'dashboard-student-answer-edit',
  templateUrl: './student-answer-edit.component.html',
  styleUrls: ['./student-answer-edit.component.scss'],
})
export class StudentAnswerEditComponent extends BaseEditComponent {
  override action_urls = {
    detail: (id: number) => `/api/s/student-answers/${id}/`,
  };
  public override editInstance: StudentAnswer | null = null;
  override ngOnInit(): void {
    this.form = this.fb.group({
      score: [[]],
    });
    super.ngOnInit();
  }
  override patchFormValue(data: any) {
    if (this.editInstance !== null) {
      this.form.patchValue({
        score: this.editInstance.score || 0,
      });
    }
  }
}
