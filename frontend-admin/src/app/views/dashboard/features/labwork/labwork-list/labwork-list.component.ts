import { Component, OnInit } from '@angular/core';
import { LabworkService } from 'src/app/core/services/labwork.service';
import {
  FilterParams,
  TableColumn,
} from 'src/app/views/dashboard/shared/components/tables/smart-table/smart-table.component';
import { Labwork } from 'src/app/core/models/labwork';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LabworkEditComponent } from '../labwork-edit/labwork-edit.component';

@Component({
  selector: 'app-labwork-list',
  templateUrl: './labwork-list.component.html',
  styleUrls: ['./labwork-list.component.scss'],
})
export class LabworkListComponent implements OnInit {
  public data: Labwork[] = [];
  public columns: TableColumn<Labwork>[] = [
    {
      header: 'Id',
      field: 'id',
    },
    {
      header: 'Title',
      field: 'title',
    },
    {
      header: 'Tags',
      field: 'tags',
      cellTemplate: (data: Labwork) => {
        let response = '';
        data.tags.forEach((tag_item) => {
          response += `<div class='btn mr-1 mb-1'>${tag_item.title}</div>`;
        });
        return response;
      },
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
    private labworkService: LabworkService,
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.labworkService
      .getLabworks({
        ...this.filterParams,
        search: this.filterParams.filterText,
      })
      .subscribe((data) => {
        this.data = [...data.results] as Labwork[];
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

  onEdit(item?: Labwork) {
    const initialState: any = {};
    if (item) {
      initialState.id = item.id;
    }
    this.bsModalRef = this.modalService.show(LabworkEditComponent, {
      initialState,
      class: 'modal-lg',
    });
  }
  onDelete(item?: Labwork) {
    if (item) {
      this.labworkService.deleteLabwork(item?.id).subscribe({
        next: () => {
          this.fetchData();
        },
      });
    }
  }
}
