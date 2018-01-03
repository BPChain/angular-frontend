import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PublicStatsService {

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  get url() {
    return environment.baseURL + environment.publicStatsResource;
  }

  getPublicStats() {
    const url = this.url;
    return this.http.get(url);
  }

  blubber(start: string, end: string) {
    const url = this.url + '?startTime=' + start + '&endTime=' + end;
    console.log(url);
    return this.http.get(url);
  }

  query<T>(query?) {
    let url = this.url;
    if (query) {
      url += `?${query}`;
    }
    return this.http.get<T>(url);
  }
}
