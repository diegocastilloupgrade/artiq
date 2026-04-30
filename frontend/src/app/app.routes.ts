import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'topics',
    loadComponent: () =>
      import('./topics/topics-list/topics-list.component').then(
        (m) => m.TopicsListComponent
      ),
  },
  { path: '', redirectTo: 'topics', pathMatch: 'full' },
];
