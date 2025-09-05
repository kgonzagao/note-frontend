import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@core/auth/auth.routes'),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@page/dashboard-app/dashboard.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./page/page.routes').then((m) => m.pageRoutes),
  },
];
