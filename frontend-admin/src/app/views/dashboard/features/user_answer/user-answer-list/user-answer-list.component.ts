import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserAnswer } from 'src/app/core/models/user-answer';
import { UserAnswerService } from 'src/app/core/services/user-answer.service';
import { FilterParams } from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { UserAnswerEditComponent } from '../user-answer-edit/user-answer-edit.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-answer-list',
  templateUrl: './user-answer-list.component.html',
  styleUrls: ['./user-answer-list.component.scss'],
})
export class UserAnswerListComponent implements OnInit {
  public data: UserAnswer[] = [];
  public pageSizeOptions: number[] = [1, 10, 25, 50, 100];

  public filterParams: FilterParams = {
    filterText: '',
    ordering: 'default',
    page_size: 10,
    page: 1,
  };
  public totalPages: number = 1;

  constructor(
    private userAnswerService: UserAnswerService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.fetchData();
  }
  private fetchData() {
    this.userAnswerService
      .getUserAnswers({
        ...this.filterParams,
        search: this.filterParams.filterText,
      })
      .subscribe((data) => {
        this.data = [...data.results] as UserAnswer[];
        this.totalPages = data.count;
      });
  }
  onSortChange(sortKey: string) {
    if (sortKey.startsWith('-')) {
      const tmp_sortKey = sortKey.slice(1);
      if (tmp_sortKey === this.filterParams.ordering) {
        this.filterParams.ordering = tmp_sortKey;
      }
    } else {
      if (sortKey === this.filterParams.ordering) {
        this.filterParams.ordering = '-' + this.filterParams.ordering;
      } else {
        this.filterParams.ordering = sortKey;
      }
    }
    this.fetchData();
  }
  onFilterChange(filterText: string) {
    this.filterParams.filterText = filterText;
    this.fetchData();
  }
  onPageSizeChange(pageSize: number) {
    this.filterParams.page_size = pageSize;
    this.filterParams.page = 1;
    this.fetchData();
  }
  onPageChange(page: number) {
    this.filterParams.page = page;
    this.fetchData();
  }
  public onEdit(item?: UserAnswer) {
    const initialState: any = {};
    if (item) {
      initialState.id = item.id;
    }
    this.modalService.show(UserAnswerEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
}
