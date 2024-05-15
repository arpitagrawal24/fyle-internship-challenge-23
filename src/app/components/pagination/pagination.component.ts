import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [
    '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css',
  ],
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Input() pageSizeOptions: number[] = [10, 20, 50, 100];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  getRangeStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getRangeEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newPageSize = Number(selectElement.value);
    this.itemsPerPage = newPageSize;
    this.pageSizeChange.emit(newPageSize);
    this.onPageChange(1);
  }
}
