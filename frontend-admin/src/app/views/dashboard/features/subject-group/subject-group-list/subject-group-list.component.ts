import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/components/base-component/base-list/base-list.component';
import { ISubjectGroup } from '../subject-group';
import { SubjectGroupEditComponent } from '../subject-group-edit/subject-group-edit.component';

@Component({
  selector: 'app-subject-group-list',
  templateUrl: './subject-group-list.component.html',
  styleUrls: ['./subject-group-list.component.scss'],
})
export class SubjectGroupListComponent extends BaseListComponent<ISubjectGroup> {
  public override table_title = 'Subject Groups';
  public override action_urls = {
    list: () => `/api/s/subject-groups/`,
    delete: (id: number) => `/api/s/subject-groups/${id}/`,
  };
  protected override openEditModal(initialState: any): void {
    this.bsModalRef = this.modalService.show(SubjectGroupEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
