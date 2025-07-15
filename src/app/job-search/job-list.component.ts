import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobListService } from './job-list.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {

  private jobsService = inject(JobListService);
  jobs = signal<any[]>([]);
  query = 'Angular Developer';

  constructor() {
    this.searchJobs();
  }

  searchJobs() {
    this.jobsService.searchJobs(this.query).subscribe((res) => {
      this.jobs.set(res.data || []);
    });
  }

}
