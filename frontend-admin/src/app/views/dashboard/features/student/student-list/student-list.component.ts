import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/components/base-component/base-list/base-list.component';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import { Student } from '../student';

@Component({
  selector: 'dashboard-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent extends BaseListComponent<Student> {
  public override table_title = 'Students';
  public override action_urls = {
    list: () => `/api/s/students/`,
    delete: (id: number) => `/api/s/students/${id}/`,
  };
  override openEditModal(initialState: any) {
    this.bsModalRef = this.modalService.show(StudentEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
