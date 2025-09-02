import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/page.routes').then((m) => m.pageRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
