import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { StudentTrainFaceImage } from '../student-train-face-image';
import { StudentTrainFaceImageEditComponent } from '../student-train-face-image-edit/student-train-face-image-edit.component';

@Component({
  selector: 'app-student-train-face-image-list',
  templateUrl: './student-train-face-image-list.component.html',
  styleUrls: ['./student-train-face-image-list.component.scss'],
})
export class StudentTrainFaceImageListComponent {
  constructor(private http: HttpClient) {}
  public table_title = 'Student Train Face Images';
  public train_loading: boolean = false;
  public actions: ITablesActionData<StudentTrainFaceImage> = {
    list: {
      use: true,
      url: () => `/api/s/student-train-face-images/`,
    },
    edit: {
      use: true,
      component: StudentTrainFaceImageEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/student-train-face-images/${id}/`,
    },
  };
  public columns: ITableColumn<StudentTrainFaceImage>[] = [
    {
      header: 'Id',
      field: 'id',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Student',
      field: 'student',
      filter: {
        type: 'text',
      },
      render(item) {
        return item.student?.user?.username;
      },
    },
    {
      header: 'Trained State',
      field: 'trained',
      render(item) {
        return (item as any).trained;
      },
    },
    {
      header: 'Created At',
      field: 'created_at',
      sortable: true,
      filter: {
        type: 'date',
      },
    },
    // {
    //   header: 'Updated At',
    //   field: 'updated_at',
    //   sortable: true,
    //   filter: {
    //     type: 'date',
    //   },
    // },
  ];
  public retrain_student_faces(id?: number) {
    this.train_loading = true;
    this.http.post(`/api/s/student-train-face-images/retrain/`, {}).subscribe({
      next: () => {
        // this.fetchData();
        this.train_loading = false;
      },
      error: (error: any) => {
        this.train_loading = false;
        if (error?.status === 500 && error?.error) {
          console.log(error.error);
          alert('Something went wrong: ' + error.error?.detail);
        } else {
          alert('Something went wrong');
        }
      },
    });
  }
}
