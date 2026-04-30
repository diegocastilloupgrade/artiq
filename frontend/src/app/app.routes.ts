import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'topics/:id',
    loadComponent: () =>
      import('./topics/topic-detail/topic-detail.component').then(
        (m) => m.TopicDetailComponent
      ),
  },
  {
    path: 'topics',
    loadComponent: () =>
      import('./topics/topics-list/topics-list.component').then(
        (m) => m.TopicsListComponent
      ),
  },
  { path: '', redirectTo: 'topics', pathMatch: 'full' },
];
