import { Routes } from '@angular/router';
import { JobListComponent } from './job-search/job-list.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { JobDetailComponent } from './job-search/job-detail/job-detail.component';

export const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'jobs/:id', component: JobDetailComponent }
];
