import { Component, inject } from '@angular/core';
import { BookmarkService } from '../shared/services/bookmark.service';
import { SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [SlicePipe, RouterModule],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {
  private readonly _bookmarkService = inject(BookmarkService);


  bookmarks = this._bookmarkService.bookmarks;

  constructor() { }
}
