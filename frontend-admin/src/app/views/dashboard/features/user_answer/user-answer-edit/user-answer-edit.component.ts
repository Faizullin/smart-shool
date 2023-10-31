import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserAnswer } from 'src/app/core/models/user-answer';
import { UserAnswerService } from 'src/app/core/services/user-answer.service';

@Component({
  selector: 'app-user-answer-edit',
  templateUrl: './user-answer-edit.component.html',
  styleUrls: ['./user-answer-edit.component.scss'],
})
export class UserAnswerEditComponent implements OnInit {
  public form!: FormGroup;
  public validationErrors: {
    [key: string]: any;
  } = {};
  public editInstance: UserAnswer | null = null;

  constructor(
    private userAnswerService: UserAnswerService,
    private fb: FormBuilder,
    private modalService: BsModalService,
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      score: [0],
    });
    const initialState = this.modalService.config.initialState as any;
    if (initialState.id) {
      this.fetchInstance(initialState.id);
    }
  }
  private fetchInstance(id?: number) {
    const item_id = id ? id : this.editInstance?.id;
    return this.userAnswerService.getUserAnswer(item_id as number).subscribe({
      next: (user_answer) => {
        this.editInstance = user_answer;
        this.form.patchValue({
          score: this.editInstance.score,
        });
      },
    });
  }
  public onSubmit() {
    if (this.editInstance) {
      this.userAnswerService
        .updateUserAnswer(this.editInstance.id, this.form.value)
        .subscribe({
          next: () => {
            this.fetchInstance();
          },
        });
    }
  }
}
