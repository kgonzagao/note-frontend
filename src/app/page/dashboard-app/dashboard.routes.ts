import { Routes } from '@angular/router';
import { RoleAppComponent } from './role-app/role-app.component';
import { UserAppComponent } from './user-app/user-app.component';
import { isAdminGuard } from '@core/auth/guards/is-admin.guard';
import { DashboardAppComponent } from './dashboard-app.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardAppComponent,
    canMatch: [isAdminGuard],
    children: [
      {
        path: 'role',
        title: 'Role',
        component: RoleAppComponent,
      },
      {
        path: 'user',
        title: 'User',
        component: UserAppComponent,
      },
      {
        path: '**',
        redirectTo: 'role',
      },
    ],
  },
];

export default dashboardRoutes;
