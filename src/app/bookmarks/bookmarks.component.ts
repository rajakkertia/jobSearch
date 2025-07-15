import { Component } from '@angular/core';
import { BookmarkService } from '../shared/services/bookmark.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {

  bookmarks = this._bookmarkService.bookmarks;

  constructor(private readonly _bookmarkService: BookmarkService) { }
}
