import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PublicStatisticsService {

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  get url() {
    return environment.baseURL + environment.publicStatsResource;
  }

  query(query?: string) {
    let url = this.url;
    if (query) {
      url += '?' + query;
    }
    return this.http.get(url);
  }

  get() {
    return this.http.get(this.url);
  }
}
