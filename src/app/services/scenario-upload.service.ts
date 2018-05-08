import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '../../config';


@Injectable()
export class ScenarioUploadService {

  constructor(private _http: HttpClient) { }


  upload(script: Object) {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.upload,
        script,
        {responseType: 'text', withCredentials: true},
      );
  }
}
