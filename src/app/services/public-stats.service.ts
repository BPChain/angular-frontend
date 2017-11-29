import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PublicStatsService {

  base = 'http://localhost:2020/api';
  resource = '/ethereum/publicStat';

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  get url() {
    return this.base + this.resource;
  }

  getPublicStats<PublicStats>() {
    const url = this.url;
    return this.http.get<PublicStats>(url);
  }
}
