import { Component } from '@angular/core';
import { BaseListComponent } from '../../../shared/components/base-component/base-list/base-list.component';
import { AssignableStudentResult } from '../assignable-student-result';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-group-assign',
  templateUrl: './subject-group-assign.component.html',
  styleUrls: ['./subject-group-assign.component.scss'],
})
export class SubjectGroupAssignComponent extends BaseListComponent<AssignableStudentResult> {
  public override table_title = 'Subject Groups';
  public override action_urls = {
    list: () => `/api/s/subject-groups/assign/`,
    post: () => `/api/s/subject-groups/assign/`,
  };
  constructor(
    http: HttpClient,
    modalService: BsModalService,
    private router: Router,
  ) {
    super(http, modalService);
  }

  public onSave() {
    const data = {};
    if (confirm('are your sure to save?')) {
      this.performSave(data);
    }
  }
  private performSave(data: any) {
    this.http
      .post(this.action_urls['post'](), data)
      .pipe(
        map((data: any) => {
          const data_results = data.results || [];
          const data_total_items = data.count || 0;
          return {
            results: data_results.map(function (data_results: any) {
              return {
                ...data_results,
              };
            }),
            count: data_total_items,
          };
        }),
      )
      .subscribe({
        next: (data) => {
          this.router.navigate(['dashboard','subject-groups']);
        },
      });
  }
}
