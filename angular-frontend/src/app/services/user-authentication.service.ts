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
      )
      .map(result => result);
  }


}
