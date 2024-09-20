import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadComponent: () => import('./todos/todos.page').then((m) => m.TodosPage),
  },
  {
    path: '**',
    redirectTo: 'todos',
  },
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
];
