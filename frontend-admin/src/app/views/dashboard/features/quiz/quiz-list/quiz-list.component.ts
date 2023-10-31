import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/base-component/base-list/base-list.component';
import { QuizEditComponent } from '../quiz-edit/quiz-edit.component';

@Component({
  selector: 'dashboard-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent<Quiz> extends BaseListComponent<Quiz> {
  public override table_title = 'Quizzes';
  public override action_urls = {
    list: () => `/api/s/quizzes/`,
    delete: (id: number) => `/api/s/quizzes/${id}/`,
  };
  override openEditModal(initialState: any) {
    this.bsModalRef = this.modalService.show(QuizEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
