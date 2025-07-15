import { Injectable, signal } from '@angular/core';
import { Job } from '../../job-search/job.model';

const LS_KEY = 'bookmarkedJobs';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private readonly saved = signal<Job[]>(this.load());

  get bookmarks() {
    return this.saved.asReadonly();
  }

  toggle(job: Job) {
    const existing = this.saved().find((j) => j.job_id === job.job_id);
    if (existing) {
      this.saved.update((list) => list.filter((j) => j.job_id !== job.job_id));
    } else {
      this.saved.update((list) => [...list, job]);
    }
    this.save();
  }

  isBookmarked(job: Job): boolean {
    return this.saved().some((j) => j.job_id === job.job_id);
  }

  private save() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.saved()));
  }

  private load(): Job[] {
    try {
      const data = localStorage.getItem(LS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
