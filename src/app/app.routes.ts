import { Routes } from '@angular/router';
import { ReportsList } from './reports/reports-list/reports-list';
import { FeaturePlaceholder } from './shared/feature-placeholder/feature-placeholder';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reports',
  },
  {
    path: 'reports',
    component: ReportsList,
  },
  {
    path: 'forms',
    component: FeaturePlaceholder,
    data: { featureName: 'Forms' },
  },
  {
    path: 'customers',
    component: FeaturePlaceholder,
    data: { featureName: 'Customers' },
  },
  {
    path: 'submissions',
    component: FeaturePlaceholder,
    data: { featureName: 'Submissions' },
  },
  {
    path: 'history',
    component: FeaturePlaceholder,
    data: { featureName: 'History' },
  },
  {
    path: 'workflow',
    component: FeaturePlaceholder,
    data: { featureName: 'Workflow' },
  },
  {
    path: '**',
    redirectTo: 'reports',
  },
];