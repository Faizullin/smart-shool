import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-smart-pagination',
  templateUrl: './smart-pagination.component.html',
  styleUrls: ['./smart-pagination.component.scss'],
})
export class SmartPaginationComponent {
  @Input() pageSize: number = 10;
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Input() paginationRangeSize: number = 4;
  @Input() pageSizeOptions: number[] = [1, 10, 25, 50, 100];
  @Output() pageSizeChanged = new EventEmitter<number>();
  @Output() pageChanged = new EventEmitter<number>();

  onPageSizeChange(size: number) {
    this.pageSizeChanged.emit(size);
  }

  onPageChange(page: number) {
    if (page < 1) {
      page = 1;
    } else if (page > Math.floor(this.totalPages / this.pageSize)) {
      // page = Math.floor(this.totalPages / this.pageSize)
      page--;
    }
    this.page = page;
    this.pageChanged.emit(page);
  }

  getPaginationRange(): number[] {
    const currentPage = this.page;
    const totalPages = this.totalPages;
    let predicted_pages_range = Math.floor(totalPages / this.pageSize);
    if (predicted_pages_range > this.paginationRangeSize) {
      predicted_pages_range = this.paginationRangeSize;
    }
    const halfRangeSize = Math.floor(predicted_pages_range / 2);
    let startPage = currentPage - halfRangeSize;
    let endPage = currentPage + halfRangeSize;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(predicted_pages_range, totalPages);
    } else if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(totalPages - predicted_pages_range + 1, 1);
    }
    const pageRange = [];
    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(i);
    }
    return pageRange;
  }
}
