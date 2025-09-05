import { Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { NoteComponent } from './note/note.component';
import { authenticatedGuard } from '@core/auth/guards/authenticated.guard';

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
        path: 'note',
        title: 'Note',
        component: NoteComponent,
        canMatch: [authenticatedGuard],
      },
      {
        path: '**',
        redirectTo: 'note',
      },
    ],
  },
];
