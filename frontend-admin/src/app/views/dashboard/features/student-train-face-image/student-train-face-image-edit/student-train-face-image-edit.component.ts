import { Component } from '@angular/core';
import { BaseEditComponent } from 'src/app/views/dashboard/shared/components/base-component/base-edit/base-edit.component';
import { StudentTrainFaceImage } from '../student-train-face-image';

@Component({
  selector: 'app-student-train-face-image-edit',
  templateUrl: './student-train-face-image-edit.component.html',
  styleUrls: ['./student-train-face-image-edit.component.scss'],
})
export class StudentTrainFaceImageEditComponent extends BaseEditComponent {
  public override action_urls = {
    post: () => `/api/s/student-train-face-images/`,
    detail: (id: number) => `/api/s/student-train-face-images/${id}/`,
  };
  public override editInstance: StudentTrainFaceImage | null = null;
}
