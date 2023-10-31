import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FilterParams,
  TableColumn,
} from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { QuizEditComponent } from '../quiz-edit/quiz-edit.component';
import { ModalService } from '@coreui/angular';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Quiz } from 'src/app/core/models/quiz';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit{
  public data: Quiz[] = [];
  public columns: TableColumn<Quiz>[] = [
    {
      header: 'Id',
      field: 'id',
      cellTemplate: (data: Quiz) => `${data.id}`,
    },
    {
      header: 'Title',
      field: 'title',
      cellTemplate: (data: Quiz) => `<strong>${data.title}</strong>`,
    },
    {
      header: 'Created At',
      field: 'created_at',
    },
    {
      header: 'Updated At',
      field: 'updated_at',
    },
  ];
  public pageSizeOptions: number[] = [1, 10, 25, 50, 100];

  public filterParams: FilterParams = {
    filterText: '',
    ordering: 'default',
    page_size: 10,
    page: 1,
  };
  public totalPages: number = 1;

  private bsModalRef!: BsModalRef;

  constructor(
    private quizService: QuizService,
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.quizService
      .getQuizes({ ...this.filterParams, search: this.filterParams.filterText })
      .subscribe((data) => {
        this.data = [...data.results] as Quiz[];
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

  onEdit(item?: Quiz) {
    const initialState: any = {};
    if (item) {
      initialState.id = item.id;
    }
    this.bsModalRef = this.modalService.show(QuizEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
  onDelete(item?: Quiz) {
    alert('No permissions');
  }
}
