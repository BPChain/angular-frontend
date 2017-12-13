import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PrivateStatsService {

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  get url() {
    return environment.baseURL + environment.privateStatsResource;
  }

  getPrivateStats<PrivateStats>() {
    const url = this.url;
    return this.http.get<PrivateStats>(url);
  }
}
