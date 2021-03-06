import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {CONFIG} from '../../config';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ScenarioConfiguratorService {

  constructor(private _http: HttpClient) { }

  upload({file, scenarioName, scenarioDescription}): Observable<string> {
    const formData = new FormData();
    formData.append('fileName', scenarioName);
    formData.append('description', scenarioDescription);
    formData.append('file', file);
    const headers = new HttpHeaders()
      .set('Scenario-Name', scenarioName);

    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.upload,
        formData,
        {
          responseType: 'text', withCredentials: true, headers},
      );
  }

  getScenarios(): Observable<Object> {
    return this._http
      .get(
        CONFIG.url.base + CONFIG.url.scenarios,
        {responseType: 'json', withCredentials: true},
      );
  }

  getScenario(id: string): Observable<Object> {
    return this._http
      .get(
        CONFIG.url.base + CONFIG.url.scenarios + id,
        {responseType: 'json', withCredentials: true},
      );
  }

  createScenario({name, description, payloadSize, period, numberOfNodes}): Observable<string> {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.scenarios,
        {name, description, payloadSize, period, numberOfNodes},
        {responseType: 'text', withCredentials: true},
      );
  }

}

