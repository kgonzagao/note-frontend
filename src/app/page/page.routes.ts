import { Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoteComponent } from './note/note.component';
import { authenticatedGuard } from '@core/auth/guards/authenticated.guard';
import { notAuthenticatedGuard } from '@core/auth/guards/not-authenticated.guard';
import { RoleAppComponent } from './role-app/role-app.component';
import { isAdminGuard } from '@core/auth/guards/is-admin.guard';
import { UserAppComponent } from './user-app/user-app.component';

export const pageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Basic Pages',
        component: ExampleComponent,
      },
      {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
        canMatch: [notAuthenticatedGuard],
      },
      {
        path: 'register',
        title: 'Register',
        component: RegisterComponent,
        canMatch: [notAuthenticatedGuard],
      },
      {
        path: 'note',
        title: 'Note',
        component: NoteComponent,
        canMatch: [authenticatedGuard],
      },
      {
        path: 'role',
        title: 'Role',
        component: RoleAppComponent,
        canMatch: [isAdminGuard],
      },
      {
        path: 'user',
        title: 'User',
        component: UserAppComponent,
        canMatch: [isAdminGuard],
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
