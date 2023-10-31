import { Component, OnInit } from '@angular/core';
import {
  FilterParams,
  TableColumn,
} from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { Series } from 'src/app/core/models/series';
import { Router } from '@angular/router';
import { UserAnswerService } from 'src/app/core/services/user-answer.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SeriesEditComponent } from '../series-edit/series-edit.component';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss'],
})
export class SeriesListComponent implements OnInit {
  public data: Series[] = [];
  public pageSizeOptions: number[] = [1, 10, 25, 50, 100];

  public filterParams: FilterParams = {
    filterText: '',
    ordering: 'default',
    page_size: 10,
    page: 1,
  };
  public totalPages: number = 1;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: BsModalService,
  ) {}
  ngOnInit(): void {
    this.fetchData();
  }
  private fetchData() {
    this.http
      .get('/api/s/series/',{
        params:{
          ...this.filterParams,
          search: this.filterParams.filterText,
        }
      })
      .pipe(
        map((data: any) => {
          const results_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: results_data.map(function (resultes: any): Series {
              return {
                ...resultes,
              } as Series;
            }),
            count: total_items,
          };
        }),
      )
      .subscribe((data) => {
        this.data = [...data.results] as Series[];
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
  onEdit(item?: Series) {
    const initialState: any = {};
    if (item) {
      initialState.id = item.id;
    }
    this.modalService.show(SeriesEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
  onDelete(item: Series) {
    this.http.delete(`/api/s/series/${item.id}/`).subscribe((data) => {
      this.fetchData();
    });
  }
}
