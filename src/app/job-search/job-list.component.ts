import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobListService } from './job-list.service';
import { SkeletonCardComponent } from '../shared/components/skeleton/skeleton-card.component';
import { Job } from './job.model';
import { BookmarkService } from '../shared/services/bookmark.service';
import { RouterModule } from '@angular/router';
import { JobCardComponent } from '../shared/components/job-card/job-card.component';
import { JobFilterComponent } from './job-filter/job-filter.component';

type FilterState = {
  query: string;
  location: string;
  company: string;
  isRemote: boolean;
  jobType: string;
  postedWithinDays: string;
};

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SkeletonCardComponent,
    RouterModule,
    JobCardComponent,
    JobFilterComponent
  ],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, AfterViewInit {
  private readonly jobsService = inject(JobListService);
  private readonly _bookmarkService = inject(BookmarkService);

  page = signal(1);
  hasMore = signal(true);
  jobs = signal<Job[]>([]);
  loading = signal(false);
  loadingMore = signal(false);

  @ViewChild('anchor', { static: true }) anchor!: ElementRef<HTMLElement>;
  observer!: IntersectionObserver;

  selectedFilters = signal<FilterState>({
    query: 'Angular Developer',
    location: 'Worldwide',
    company: 'All',
    isRemote: false,
    jobType: 'All',
    postedWithinDays: 'Any'
  });

  query = 'Angular Developer';
  locations = [
    'Worldwide',
    'Remote',
    'Germany',
    'Portugal',
    'Georgia',
    'Poland',
    'Spain',
    'United States',
    'United Kingdom',
    'Netherlands'
  ];
  selectedLocation = 'Worldwide';

  ngOnInit() {
    this.searchJobs();
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.loading() && this.hasMore()) {
        this.searchJobs(true); // append = true
      }
    });

    if (this.anchor?.nativeElement) {
      this.observer.observe(this.anchor.nativeElement);
    }
  }

  searchJobs(append = false): void {
    if (append) {
      this.loadingMore.set(true);
    } else {
      this.loading.set(true);
      this.jobs.set([]);
      this.page.set(1);
      this.hasMore.set(true);
    }

    const filters = this.selectedFilters();

    // NOTE: You should extend `searchJobs` in your service to accept filters too.
    this.jobsService.searchJobs(this.page(), filters).subscribe({
      next: (res: { data: Job[] }) => {
        const newJobs = res.data || [];
        if (newJobs.length === 0) this.hasMore.set(false);
        this.jobs.update(j => (append ? [...j, ...newJobs] : newJobs));
        this.page.update(p => p + 1);
      },
      error: err => console.error('Error fetching jobs:', err),
      complete: () => {
        this.loading.set(false);
        this.loadingMore.set(false);
      }
    });
  }

  get uniqueCompanies(): string[] {
    const all = this.jobs().map(j => j.employer_name).filter(Boolean);
    return ['All', ...Array.from(new Set(all))];
  }

  toggleBookmark(job: Job) {
    this._bookmarkService.toggle(job);
  }

  isBookmarked(job: Job): boolean {
    return this._bookmarkService.isBookmarked(job);
  }

  onFiltersChanged(filters: FilterState): void {
    this.selectedFilters.set(filters);
    this.searchJobs(); // triggers API call with new filters
  }
}
