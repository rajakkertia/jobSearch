import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobListService } from './job-list.service';
import { SkeletonCardComponent } from '../shared/components/skeleton/skeleton-card.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonCardComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {

  private jobsService = inject(JobListService);
  jobs = signal<any[]>([]);
  loading = signal(false);
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

  constructor() {
    // this.searchJobs();
  }

  ngOnInit() {
    // Initial job search
    this.searchJobs();
  }

  searchJobs() {
    this.loading.set(true);
    this.jobs.set([]); // Clear previous jobs
    const location = this.selectedLocation === 'Worldwide' ? '' : this.selectedLocation;
    this.jobsService.searchJobs(this.query, location).subscribe((res) => {
      this.jobs.set(res.data || []);
      this.loading.set(false);
    }, (error) => {
      console.error('Error fetching jobs:', error);
      this.loading.set(false);
    });
  }

}
