import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-job-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss']
})
export class JobFilterComponent {
  @Input() companies: string[] = [];
  @Input() locations: string[] = [];

  @Output() filtersChanged = new EventEmitter<{
    query: string;
    location: string;
    company: string;
    isRemote: boolean;
    jobType: string;
    postedWithinDays: string;
  }>();

  private readonly _query = signal('');
  private readonly _location = signal('Worldwide');
  private readonly _company = signal('All');
  private readonly _isRemote = signal(false);
  private readonly _jobType = signal('All');
  private readonly _postedWithinDays = signal('Any');

  // ---- Getters and Setters ----
  get query() {
    return this._query();
  }
  set query(value: string) {
    if (value.length < 3) return; // Prevent setting query if less than 3 characters
    this._query.set(value);
    this.emitFilters();
  }

  get location() {
    return this._location();
  }
  set location(value: string) {
    this._location.set(value);
    this.emitFilters();
  }

  get company() {
    return this._company();
  }
  set company(value: string) {
    this._company.set(value);
    this.emitFilters();
  }

  get isRemote() {
    return this._isRemote();
  }
  set isRemote(value: boolean) {
    this._isRemote.set(value);
    this.emitFilters();
  }

  get jobType() {
    return this._jobType();
  }
  set jobType(value: string) {
    this._jobType.set(value);
    this.emitFilters();
  }

  get postedWithinDays() {
    return this._postedWithinDays();
  }
  set postedWithinDays(value: string) {
    this._postedWithinDays.set(value);
    this.emitFilters();
  }

  // ---- Reset All Filters ----
  resetFilters(): void {
    this._query.set('');
    this._location.set('Worldwide');
    this._company.set('All');
    this._isRemote.set(false);
    this._jobType.set('All');
    this._postedWithinDays.set('Any');
    this.emitFilters();
  }

  // ---- Emit Filters to Parent ----
  emitFilters(): void {
    this.filtersChanged.emit({
      query: this.query,
      location: this.location,
      company: this.company,
      isRemote: this.isRemote,
      jobType: this.jobType,
      postedWithinDays: this.postedWithinDays
    });
  }
}
