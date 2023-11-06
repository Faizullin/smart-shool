import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserAnswer } from 'src/app/core/models/user-answer';
import { UserAnswerService } from 'src/app/core/services/user-answer.service';
import { FilterParams } from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { UserAnswerEditComponent } from '../user-answer-edit/user-answer-edit.component';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '../../../shared/components/base-component/base-list/base-list.component';

@Component({
  selector: 'app-user-answer-list',
  templateUrl: './user-answer-list.component.html',
  styleUrls: ['./user-answer-list.component.scss'],
})
export class UserAnswerListComponent extends BaseListComponent<UserAnswer> {
  override action_urls = {
    list: () => `/api/s/student-answers/`,
    delete: (id: number) => `/api/s/student-answers/${id}/`,
  };
  // private fetchData() {
  //   this.userAnswerService
  //     .getUserAnswers({
  //       ...this.filterParams,
  //       search: this.filterParams.filterText,
  //     })
  //     .subscribe((data) => {
  //       this.data = [...data.results] as UserAnswer[];
  //       this.totalPages = data.count;
  //     });
  // }
  protected override openEditModal(initialState: any): void {
    this.bsModalRef = this.modalService.show(UserAnswerEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
