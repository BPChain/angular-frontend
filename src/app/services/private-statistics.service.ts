import {Inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PrivateStatisticsService {

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  get url() {
    return environment.baseURL + environment.privateStatsResource;
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
