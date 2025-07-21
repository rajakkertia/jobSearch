import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type FilterState = {
  query: string;
  location: string;
  company: string;
  isRemote: boolean;
  jobType: string;
  postedWithinDays: string;
};


@Injectable({
  providedIn: 'root'
})
export class JobListService {
  private readonly _http = inject(HttpClient);



  private readonly baseUrl = 'https://jsearch.p.rapidapi.com/search';
  private readonly headers = new HttpHeaders({
    'X-RapidAPI-Key': '0f4b0062b8msh7be97d70bd47bebp1afe57jsn0ea15abaca94',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  });

  constructor() { }



  searchJobs(page = 1, filters?: FilterState): Observable<any> {
    let params = new HttpParams()
      .set('num_pages', page.toString());

    if (filters) {
      if (filters.query) params = params.set('query', filters.query);
      if (filters.location) params = params.set('location', filters.location);
      if (filters.isRemote) params = params.set('remote_jobs_only', 'true');
      if (filters.jobType !== 'All') params = params.set('employment_types', filters.jobType);
      if (filters.postedWithinDays !== 'Any') {
        params = params.set('date_posted', filters.postedWithinDays);
      }
    }

    return this._http.get(this.baseUrl, { headers: this.headers, params });
  }

  getJobDetails(jobId: string): Observable<any> {
    const params = new HttpParams().set('job_id', jobId);
    return this._http.get('https://jsearch.p.rapidapi.com/job-details', {
      headers: this.headers,
      params
    });
  }
}
