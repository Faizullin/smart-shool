import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { StudentEditComponent } from '../student-edit/student-edit.component';

@Component({
  selector: 'dashboard-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
  ) {}
  public table_title = 'Students';
  public actions: ITablesActionData<Student> = {
    list: {
      use: true,
      url: () => `/api/s/students/`,
    },
    edit: {
      use: true,
      component: StudentEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/students/${id}/`,
    },
  };
  public columns: ITableColumn<Student>[] = [
    {
      header: 'Id',
      field: 'id',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Username',
      field: 'username',
      filter: {
        type: 'text',
      },
      render(item) {
        return item.user?.username;
      },
    },
    {
      header: 'Subject Group',
      field: 'subject_group',
      filter: {
        type: 'select',
        fetch: {
          useInitital: true,
          action: () =>
            this.http.get(`/api/s/subject-groups`).pipe(
              map((data: any) => {
                const data_results = data.results || [];
                return data_results;
              }),
            ),
          label_field: 'title',
          value_field: 'id',
        },
      },
      render(item) {
        return (item as any).current_group?.title;
      },
    },
    // {
    //   header: 'Created At',
    //   field: 'created_at',
    //   sortable: true,
    //   filter: {
    //     type: 'date',
    //   },
    // },
    // {
    //   header: 'Updated At',
    //   field: 'updated_at',
    //   sortable: true,
    //   filter: {
    //     type: 'date',
    //   },
    // },
  ];
  ngOnInit(): void {
    const user = this.authStorageService.getUser();
    if (
      user !== null &&
      !user.roles?.includes('admin') &&
      user.roles?.includes('teacher')
    ) {
      this.table_title = 'My students';
    }
  }
}
