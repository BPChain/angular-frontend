import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PublicStatsService {

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  get url() {
    return environment.baseURL + environment.publicStatsResource;
  }

  getPublicStats<PublicStats>() {
    const url = this.url;
    return this.http.get<PublicStats>(url);
  }
}
