import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/components/base-component/base-list/base-list.component';
import { ISubject } from '../subject';
import { SubjectEditComponent } from '../subject-edit/subject-edit.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent extends BaseListComponent<ISubject> {
  public override table_title = 'Subjects';
  public override action_urls = {
    list: () => `/api/s/subjects/`,
    delete: (id: number) => `/api/s/subjects/${id}/`,
  };
  protected override openEditModal(initialState: any): void {
    this.bsModalRef = this.modalService.show(SubjectEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
