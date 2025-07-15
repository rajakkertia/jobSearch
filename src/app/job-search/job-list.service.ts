import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  searchJobs(query: string, location = '', page = 1): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('location', location)
      .set('page', page.toString())
      .set('num_pages', '1');

    return this._http.get(this.baseUrl, { headers: this.headers, params });
  }
}
