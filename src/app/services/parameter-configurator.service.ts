import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import {CONFIG} from '../../config';

@Injectable()
export class ParameterConfiguratorService {

  constructor(private _http: HttpClient) { }

  getConnectedNodes(): Observable<string> {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.connectedNodes,
        {},
        {responseType: 'text'},
      );
  }

  chainInfo(): Observable<string> {
    return this._http
      .get(
        CONFIG.url.base + CONFIG.url.chainInfo,
        {responseType: 'text'},
      );
  }

  setChainParameters(parameters: object): Observable<string> {
    return this._http
    .post(
      CONFIG.url.base + CONFIG.url.changeParameter,
      parameters,
      {responseType: 'text'},
    );
  }
}
