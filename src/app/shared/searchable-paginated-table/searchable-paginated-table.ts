import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-searchable-paginated-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchable-paginated-table.html',
  styleUrls: ['./searchable-paginated-table.scss'],
})
export class SearchablePaginatedTable<T extends Record<string, any>> implements OnInit, OnChanges {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() pageSize = 5;
  @Input() searchPlaceholder = 'Search...';
  @Input() searchFields: string[] = [];
  @Input() sortConfig?: SortConfig;
  @Input() recordLabel = 'Records';
  @Input() showSearch = true;
  @Input() showPagination = true;
  @Input() showSort = true;
  @Input() rowTemplate?: TemplateRef<{ $implicit: T; index: number }>;
  @Input() trackByFn?: (index: number, item: T) => any;

  @Output() itemDelete = new EventEmitter<T>();
  @Output() itemEdit = new EventEmitter<T>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<SortConfig>();

  searchTerm = '';
  currentSort: SortConfig | null = null;
  currentPage = 1;
  dropdownOpen = false;
  sortByNewest = true; // true = newest (desc), false = oldest (asc)
  
  filteredData: T[] = [];
  visibleData: T[] = [];
  totalRecords = 0;
  totalPages = 0;
  pages: number[] = [];
  hoveredRow: number | null = null;

  ngOnInit(): void {
    if (this.sortConfig) {
      this.currentSort = { ...this.sortConfig };
      this.sortByNewest = this.sortConfig.direction === 'desc';
    } else {
      // Default to newest first
      this.currentSort = { key: 'created', direction: 'desc' };
      this.sortByNewest = true;
    }
    this.applyFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['searchFields'] || changes['sortConfig']) {
      if (this.sortConfig) {
        this.currentSort = { ...this.sortConfig };
        this.sortByNewest = this.sortConfig.direction === 'desc' && this.sortConfig.key === 'created';
      }
      this.currentPage = 1;
      this.applyFilters();
    }
    if (changes['pageSize']) {
      this.currentPage = 1;
      this.applyFilters();
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  onSearchChange(term: string): void {
    this.searchTerm = term.trim().toLowerCase();
    this.currentPage = 1;
    this.applyFilters();
  }

  onSortChange(key: string): void {
    this.closeDropdown();
    if (!this.currentSort || this.currentSort.key !== key) {
      this.currentSort = { key, direction: 'asc' };
    } else if (this.currentSort.direction === 'asc') {
      this.currentSort.direction = 'desc';
    } else {
      this.currentSort = null;
    }
    this.currentPage = 1;
    this.applyFilters();
    if (this.currentSort) {
      this.sortChange.emit(this.currentSort);
    }
  }

  setSortNewest(): void {
    this.closeDropdown();
    this.sortByNewest = true;
    this.currentSort = {
      key: 'created',
      direction: 'desc',
    };
    this.currentPage = 1;
    this.applyFilters();
    this.sortChange.emit(this.currentSort);
  }

  setSortOldest(): void {
    this.closeDropdown();
    this.sortByNewest = false;
    this.currentSort = {
      key: 'created',
      direction: 'asc',
    };
    this.currentPage = 1;
    this.applyFilters();
    this.sortChange.emit(this.currentSort);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.applyFilters();
    this.pageChange.emit(page);
  }

  deleteItem(item: T): void {
    this.itemDelete.emit(item);
  }

  editItem(item: T): void {
    this.itemEdit.emit(item);
  }

  get rangeStart(): number {
    if (this.totalRecords === 0) {
      return 0;
    }
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get rangeEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalRecords);
  }

  getSortIcon(columnKey: string): string {
    if (!this.currentSort || this.currentSort.key !== columnKey) {
      return 'bi-arrow-down-up';
    }
    return this.currentSort.direction === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
  }

  getColumnLabel(key: string): string {
    const column = this.columns.find((col) => col.key === key);
    return column ? column.label : key;
  }

  trackByIndex(index: number, item: T): any {
    if (this.trackByFn) {
      return this.trackByFn(index, item);
    }
    return index;
  }

  private applyFilters(): void {
    let result = [...(this.data ?? [])];

    // Apply search filter
    if (this.searchTerm && this.searchFields.length > 0) {
      result = result.filter((item) => {
        const searchableText = this.searchFields
          .map((field) => {
            const value = this.getNestedValue(item, field);
            return value ? String(value).toLowerCase() : '';
          })
          .join(' ');
        return searchableText.includes(this.searchTerm);
      });
    }

    // Apply sorting
    if (this.currentSort) {
      result.sort((a, b) => {
        const aValue = this.getNestedValue(a, this.currentSort!.key);
        const bValue = this.getNestedValue(b, this.currentSort!.key);
        
        if (aValue === bValue) return 0;
        
        let comparison = 0;
        if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }
        
        return this.currentSort!.direction === 'asc' ? comparison : -comparison;
      });
    }

    this.filteredData = result;
    this.totalRecords = result.length;
    this.totalPages = Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    this.visibleData = result.slice(start, start + this.pageSize);
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
}
