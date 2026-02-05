import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { Report } from '../report.model';
import { SearchablePaginatedTable, TableColumn } from '../../shared/searchable-paginated-table/searchable-paginated-table';

@Component({
  selector: 'app-reports-list',
  standalone: true,
  imports: [CommonModule, SearchablePaginatedTable],
  templateUrl: './reports-list.html',
  styleUrl: './reports-list.scss',
})
export class ReportsList implements AfterViewInit {
  readonly reports: Report[] = [
    {
      id: 1,
      name: 'Test Report',
      created: new Date('2020-12-24'),
      modified: new Date('2020-12-24'),
      owner: 'zendumademo-trax@zenduit.com',
      form: 'Billing Chilling Regular Form',
    },
    {
      id: 2,
      name: 'Test Report 2',
      created: new Date('2020-12-26'),
      modified: new Date('2020-12-26'),
      owner: 'johndodson@zenduit.com',
      form: 'Geotab odometer-test',
    },
    {
      id: 3,
      name: 'SAWG Install Report',
      created: new Date('2020-12-27'),
      modified: new Date('2020-12-29'),
      owner: 'joshuatreffue@zenduit.com',
      form: 'Bill of Landing Template',
    },
    {
      id: 4,
      name: 'Five and Ambulance for Wood Buffalo',
      created: new Date('2020-12-28'),
      modified: new Date('2020-12-28'),
      owner: 'christianbale@zenduit.com',
      form: 'Product Delivery Form Test',
    },
    {
      id: 5,
      name: 'Test Report 3',
      created: new Date('2020-12-30'),
      modified: new Date('2020-12-30'),
      owner: 'margaretleblanc@zenduit.com',
      form: 'Product test Form',
    },
    // extra mock entries to demonstrate pagination
    {
      id: 6,
      name: 'Safety Inspection Report',
      created: new Date('2020-12-31'),
      modified: new Date('2021-01-02'),
      owner: 'inspector@example.com',
      form: 'Vehicle Safety Checklist',
    },
    {
      id: 7,
      name: 'Monthly Summary',
      created: new Date('2021-01-05'),
      modified: new Date('2021-01-06'),
      owner: 'manager@example.com',
      form: 'Operations Summary Form',
    },
    {
      id: 8,
      name: 'Incident Report',
      created: new Date('2021-01-10'),
      modified: new Date('2021-01-11'),
      owner: 'safety@example.com',
      form: 'Incident Capture Form',
    },
    {
      id: 9,
      name: 'Audit Checklist',
      created: new Date('2021-01-15'),
      modified: new Date('2021-01-15'),
      owner: 'auditor@example.com',
      form: 'Audit Form',
    },
    {
      id: 10,
      name: 'Equipment Maintenance Report',
      created: new Date('2021-01-20'),
      modified: new Date('2021-01-21'),
      owner: 'maintenance@example.com',
      form: 'Maintenance Form',
    },
    {
      id: 11,
      name: 'Weekly Dispatch Summary',
      created: new Date('2021-01-25'),
      modified: new Date('2021-01-25'),
      owner: 'dispatch@example.com',
      form: 'Dispatch Summary Form',
    },
    {
      id: 12,
      name: 'Customer Feedback Report',
      created: new Date('2021-02-01'),
      modified: new Date('2021-02-02'),
      owner: 'support@example.com',
      form: 'Feedback Form',
    },
    {
      id: 13,
      name: 'Training Attendance',
      created: new Date('2021-02-03'),
      modified: new Date('2021-02-03'),
      owner: 'hr@example.com',
      form: 'Training Form',
    },
    {
      id: 14,
      name: 'Inventory Snapshot',
      created: new Date('2021-02-04'),
      modified: new Date('2021-02-04'),
      owner: 'inventory@example.com',
      form: 'Inventory Form',
    },
    {
      id: 15,
      name: 'Route Performance Report',
      created: new Date('2021-02-05'),
      modified: new Date('2021-02-06'),
      owner: 'analytics@example.com',
      form: 'Route Performance Form',
    },
  ];

  readonly columns: TableColumn[] = [
    { key: 'name', label: 'Report Name', sortable: true },
    { key: 'created', label: 'Created', sortable: true },
    { key: 'modified', label: 'Modified', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'form', label: 'Form', sortable: true },
  ];

  readonly searchFields = ['name', 'owner', 'form'];
  readonly defaultSort = { key: 'created', direction: 'desc' as const };

  @ViewChild('reportRowTemplate') reportRowTemplate!: TemplateRef<any>;

  ngAfterViewInit(): void {
    // Template is now available
  }

  onDelete(report: Report): void {
    const index = this.reports.findIndex((r) => r.id === report.id);
    if (index !== -1) {
      this.reports.splice(index, 1);
    }
  }

  onEdit(report: Report): void {
    // Edit functionality can be implemented here
    console.log('Edit report:', report);
  }

  trackById(index: number, item: Report): number {
    return item.id;
  }
}
