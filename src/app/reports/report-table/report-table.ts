import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Report } from '../report.model';

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-table.html',
  styleUrls: ['./report-table.scss'],
})
export class ReportTable implements OnChanges {
  @Input() reports: Report[] = [];
  @Input() pageSize = 5;

  hoveredRow: number | null = null;

  private allReports: Report[] = [];

  searchTerm = '';
  sortBy: 'newest' | 'oldest' = 'newest';

  currentPage = 1;
  visibleReports: Report[] = [];
  totalRecords = 0;
  totalPages = 0;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reports']) {
      this.allReports = [...(this.reports ?? [])];
      this.currentPage = 1;
      this.applyFilters();
    }
  }

  onSearchChange(term: string): void {
    this.searchTerm = term.trim().toLowerCase();
    this.currentPage = 1;
    this.applyFilters();
  }

  onSortChange(value: 'newest' | 'oldest'): void {
    this.sortBy = value;
    this.currentPage = 1;
    this.applyFilters();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.applyFilters();
  }

  deleteReport(report: Report): void {
    const confirmed = window.confirm(`Delete report "${report.name}"? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    this.allReports = this.allReports.filter((r) => r.id !== report.id);
    if ((this.currentPage - 1) * this.pageSize >= this.allReports.length && this.currentPage > 1) {
      this.currentPage--;
    }
    this.applyFilters();
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

  trackById(index: number, item: Report): number {
    return item.id;
  }

  private applyFilters(): void {
    let reports = [...this.allReports];

    if (this.searchTerm) {
      reports = reports.filter((report) => {
        const haystack = `${report.name} ${report.owner} ${report.form}`.toLowerCase();
        return haystack.includes(this.searchTerm);
      });
    }

    reports.sort((a, b) => {
      const diff = a.created.getTime() - b.created.getTime();
      return this.sortBy === 'newest' ? -diff : diff;
    });

    this.totalRecords = reports.length;
    this.totalPages = Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    this.visibleReports = reports.slice(start, start + this.pageSize);
  }
}

