import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '../../config';


@Injectable()
export class UserAuthenticationService {

  constructor(private _http: HttpClient) { }


  authenticate(username: string, password: string) {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.login,
        {username, password},
        {responseType: 'text'},
      )
      .map(response => response === 'true');
  }

  checkAuthenticationStatus() {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.checkLogin,
        {},
        {responseType: 'text'}
      )
      .map(response => response === 'true');
  }

  logout() {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.logout,
        {},
        {responseType: 'text'},
      );
  }


}
