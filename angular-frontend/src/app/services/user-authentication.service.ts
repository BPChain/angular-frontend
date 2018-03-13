import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserAuthenticationService {

  constructor(private _http: HttpClient) { }


  authenticate(username: string, password: string) {
    return this._http
      .post(
        `http://localhost:3000/login`,
        {username, password},
        {responseType: 'text'},
      )
      .map(response => response === 'true');
  }

  checkAuthenticationStatus() {
    return this._http
      .post(
        'http://localhost:3000/checkLogin',
        {},
        {responseType: 'text'}
      )
      .map(response => response === 'true');
  }

  logout() {
    return this._http
      .post(
        `http://localhost:3000/logout`,
        {},
        {responseType: 'text'},
      );
  }


}
