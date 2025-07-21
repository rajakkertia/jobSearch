import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookmarkService } from '../../services/bookmark.service';
import { Job } from '../../../job-search/job.model';

@Component({
  standalone: true,
  selector: 'app-job-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
  private readonly _bookmarkService = inject(BookmarkService);

  @Input() job!: Job;

  toggleBookmark() {
    this._bookmarkService.toggle(this.job);
  }

  isBookmarked(): boolean {
    return this._bookmarkService.isBookmarked(this.job);
  }

  getInitials(name: string | undefined): string {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

}
