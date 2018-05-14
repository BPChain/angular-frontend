import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {CONFIG} from '../../config';


@Injectable()
export class ScenarioUploadService {

  constructor(private _http: HttpClient) { }


  /* upload(script: Object) {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.upload,
        script,
        {responseType: 'text', withCredentials: true},
      );
  } */
  upload({file, scenarioName}) {
    const formData = new FormData();
    formData.append('fileName', scenarioName);
    formData.append('file', file);
    const headers = new HttpHeaders()
      .set('Scenario-Name', scenarioName)

    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.upload,
        formData,
        {
          responseType: 'text', withCredentials: true, headers},
      );
  }
}
