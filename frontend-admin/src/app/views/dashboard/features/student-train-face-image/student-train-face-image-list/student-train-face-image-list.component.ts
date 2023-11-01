import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/components/base-component/base-list/base-list.component';
import { StudentTrainFaceImageEditComponent } from '../student-train-face-image-edit/student-train-face-image-edit.component';
import { StudentTrainFaceImage } from '../student-train-face-image';

@Component({
  selector: 'app-student-train-face-image-list',
  templateUrl: './student-train-face-image-list.component.html',
  styleUrls: ['./student-train-face-image-list.component.scss'],
})
export class StudentTrainFaceImageListComponent extends BaseListComponent<StudentTrainFaceImage> {
  public override table_title = 'Student Train Face Images';
  public override action_urls = {
    list: () => `/api/s/student-train-face-images/`,
    delete: (id: number) => `/api/s/students/${id}/`,
  };
  override openEditModal(initialState: any) {
    this.bsModalRef = this.modalService.show(
      StudentTrainFaceImageEditComponent,
      {
        initialState,
        class: 'modal-lg',
      },
    );
  }
  public retrain_student_faces(id?: number) {
    // if(id) {
    //   console.warn("Further developemnt required")
    // }
    this.http.post(`/api/s/student-train-face-images/retrain/`, {}).subscribe({
      next: (data) => {
        this.fetchData();
      },
      error: (error) => {
        alert('Something went wrong');
      },
    });
  }
}
