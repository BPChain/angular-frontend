import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PrivateStatsService {

  base = 'http://localhost:2020/api';
  resource = '/ethereum/privateStat';

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  get url() {
    return this.base + this.resource;
  }

  getPrivateStats<PrivateStats>() {
    const url = this.url;
    return this.http.get<PrivateStats>(url);
  }
}
