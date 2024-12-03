import { Component } from '@angular/core';
import {
  ITableColumn,
  ITablesActionData,
} from '../../../shared/components/base-component/base-list/base-list.component';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Result } from '../result';
import { ResultEditComponent } from '../result-edit/result-edit.component';
import { ResultStatsComponent } from '../result-stats/result-stats.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FeedbackEditComponent } from './../../feedback/feedback-edit/feedback-edit.component';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent {
  constructor(
    private http: HttpClient,
    protected modalService: BsModalService,
  ) {}
  public table_title = 'Results';
  public actions: ITablesActionData<Result> = {
    list: {
      use: true,
      url: () => `/api/s/results/`,
    },
    edit: {
      use: true,
      component: ResultEditComponent,
    },
    delete: {
      use: true,
      url: (id) => `/api/s/results/${id}/`,
    },
  };
  public columns: ITableColumn<Result>[] = [
    {
      header: 'Id',
      field: 'id',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Total Score',
      field: 'total_score',
      sortable: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'Checked',
      field: 'checked',
      filter: {
        type: 'select',
        fetch: {
          data: [
            {
              label: 'Checked',
              value: 'true',
            },
            {
              label: 'Not Checked',
              value: 'false',
            },
          ],
        },
      },
    },

    {
      header: 'Attendance',
      field: 'attendance',
      filter: {
        type: 'select',
        fetch: {
          data: [
            {
              label: 'Attended',
              value: 'true',
            },
            {
              label: 'Absent',
              value: 'false',
            },
          ],
        },
      },
      render(item) {
        return item.attendance ? 'Attended' : 'Absent';
      },
    },
    {
      header: 'Student',
      field: 'student',
      filter: {
        type: 'text',
      },
      render(item) {
        return item.student?.user?.username || '';
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
          value_field: 'id',
          label_field: 'title',
        },
      },
      render(item) {
        return (item.student as any)?.current_group?.title || '';
      },
    },
    {
      header: 'Updated At',
      field: 'updated_at',
      sortable: true,
      filter: {
        type: 'date',
      },
    },
    {
      header: 'Feedback Actions',
      field: 'feedback_actions',
    },
    {
      header: 'Student stats',
      field: 'stats',
    },
  ];
  bsModalRef?: BsModalRef<any>;
  public onEditFeedback(result_instance: Result) {
    const initialState: any = {};
    if (result_instance.feedback?.id) {
      initialState.id = result_instance.feedback?.id;
    } else {
      initialState.initial_data = {
        result_instance: result_instance,
      };
    }
    this.bsModalRef = this.modalService.show(FeedbackEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
  public onStatsOpenClick(student_id?: number) {
    const initialState: any = {};
    if (student_id !== undefined) {
      initialState.id = student_id;
    }
    this.bsModalRef = this.modalService.show(ResultStatsComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
