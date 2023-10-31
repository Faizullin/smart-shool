import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/base-component/base-list/base-list.component';
import { StudentEditComponent } from '../student-edit/student-edit.component';

@Component({
  selector: 'dashboard-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent<Student> extends BaseListComponent<Student> {
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
  public retrain_student_faces() {
    this.http.post(`/api/s/students/retrain/`,{}).subscribe({
      next: (data) => {
        this.fetchData();
      },
      error: (error) => {
        alert("Something went wrong")
      }
    })
  }
}
