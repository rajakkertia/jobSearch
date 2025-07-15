import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobListService } from './job-list.service';
import { SkeletonCardComponent } from '../shared/components/skeleton/skeleton-card.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonCardComponent],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, AfterViewInit {

  private readonly jobsService = inject(JobListService);
  page = signal(1);
  hasMore = signal(true);
  jobs = signal<any[]>([]);
  loading = signal(false);
  @ViewChild('anchor', { static: true }) anchor!: ElementRef<HTMLElement>;
  observer!: IntersectionObserver;


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

  constructor() { }

  ngOnInit() {
    // Initial job search
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
  searchJobs(append = false) {
    if (!append) {
      this.jobs.set([]);
      this.page.set(1);
      this.hasMore.set(true);
    }

    this.loading.set(true);

    const location = this.selectedLocation === 'Worldwide' ? '' : this.selectedLocation;

    this.jobsService.searchJobs(this.query, location, this.page()).subscribe({
      next: (res: { data: any }) => {
        const newJobs = res.data || [];
        if (newJobs.length === 0) {
          this.hasMore.set(false);
        }

        this.jobs.update((existing) => append ? [...existing, ...newJobs] : newJobs);
        this.page.update((p) => p + 1);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
        this.loading.set(false);
      }
    });
  }



}
