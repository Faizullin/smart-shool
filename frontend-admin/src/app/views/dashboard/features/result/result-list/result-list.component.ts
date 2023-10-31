import { Component, OnInit } from '@angular/core';
import {
  FilterParams,
  TableColumn,
} from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { Result } from 'src/app/core/models/result';
import { ResultService } from './../../../../../core/services/result.service';
import { Router } from '@angular/router';
import { UserAnswerService } from 'src/app/core/services/user-answer.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit {
  public data: Result[] = [];
  public pageSizeOptions: number[] = [1, 10, 25, 50, 100];

  public filterParams: FilterParams = {
    filterText: '',
    ordering: 'default',
    page_size: 10,
    page: 1,
  };
  public totalPages: number = 1;

  constructor(
    private resultService: ResultService,
    private userAnswerService: UserAnswerService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.fetchData();
  }
  private fetchData() {
    this.resultService
      .getResults({
        ...this.filterParams,
        search: this.filterParams.filterText,
      })
      .subscribe((data) => {
        this.data = [...data.results] as Result[];
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
}
