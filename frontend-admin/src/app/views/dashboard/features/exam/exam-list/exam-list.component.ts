import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/base-component/base-list/base-list.component';
import { ExamEditComponent } from '../exam-edit/exam-edit.component';
import { Exam } from './../exam';

@Component({
  selector: 'dashboard-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
})
export class ExamListComponent<Exam> extends BaseListComponent<Exam> {
  public override table_title = 'Exams';
  public override action_urls = {
    list: () => `/api/s/exams/`,
    delete: (id: number) => `/api/s/exams/${id}/`,
  };

  override openEditModal(initialState: any) {
    this.bsModalRef = this.modalService.show(ExamEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
