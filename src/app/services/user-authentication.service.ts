import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '../../config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserAuthenticationService {

  constructor(private _http: HttpClient) { }


  authenticate(username: string, password: string): Observable<boolean> {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.login,
        {username, password},
        {responseType: 'text', withCredentials: true},
      )
      .map(response => response === 'true');
  }

  checkAuthenticationStatus(): Observable<string> {
    return this._http
      .get(
        CONFIG.url.base + CONFIG.url.checkLogin,
        {responseType: 'text', withCredentials: true}
      );
  }

  logout(): Observable<string> {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.logout,
        {},
        {responseType: 'text', withCredentials: true},
      );
  }


}
