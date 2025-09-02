import { Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
      },
      {
        path: 'register',
        title: 'Register',
        component: RegisterComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
