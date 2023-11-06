import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserAnswer } from 'src/app/core/models/user-answer';
import { UserAnswerService } from 'src/app/core/services/user-answer.service';
import { BaseEditComponent } from '../../../shared/components/base-component/base-edit/base-edit.component';

@Component({
  selector: 'app-user-answer-edit',
  templateUrl: './user-answer-edit.component.html',
  styleUrls: ['./user-answer-edit.component.scss'],
})
export class UserAnswerEditComponent extends BaseEditComponent {
  public override editInstance: UserAnswer | null = null;
  override ngOnInit(): void {
    this.form = this.fb.group({
      score: [0],
    });
    super.ngOnInit()
  }
  override patchFormValue(){
    if(this.editInstance !== null) {
      this.form.patchValue({
        score: this.editInstance.score,
      });
    }
  }
  // public onSubmit() {
  //   if (this.editInstance) {
  //     this.userAnswerService
  //       .updateUserAnswer(this.editInstance.id, this.form.value)
  //       .subscribe({
  //         next: () => {
  //           this.fetchInstance();
  //         },
  //       });
  //   }
  // }
}
