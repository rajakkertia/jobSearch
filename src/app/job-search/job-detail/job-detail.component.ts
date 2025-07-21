import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { JobListService } from '../job-list.service';
import { Job } from '../job.model';
import { BookmarkService } from '../../shared/services/bookmark.service';

@Component({
  standalone: true,
  selector: 'app-job-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _jobService = inject(JobListService);
  private readonly _bookmarkService = inject(BookmarkService);
  private readonly _location = inject(Location);

  job = signal<Job | null>(null);
  loading = signal(true);

  constructor() {
    const jobId = this._route.snapshot.paramMap.get('id');
    if (jobId) {
      this._jobService.getJobDetails(jobId).subscribe({
        next: (res) => {
          this.job.set(res.data[0] || null);
          this.loading.set(false);
        },
        error: () => {
          this.job.set(null);
          this.loading.set(false);
        }
      });
    }
  }

  toggleBookmark(job: Job) {
    this._bookmarkService.toggle(job);
  }

  isBookmarked(job: Job): boolean {
    return this._bookmarkService.isBookmarked(job);
  }

  formatDescription(text: string): string {
    return text
      .split('\n')
      .map(p => `<p>${p.trim()}</p>`)
      .join('');
  }

  goBack() {
    this._location.back();
  }
}
