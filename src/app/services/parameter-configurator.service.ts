import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import {CONFIG} from '../../config';

@Injectable()
export class ParameterConfiguratorService {

  constructor(private _http: HttpClient) { }

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
      {responseType: 'text', withCredentials: true},
    );
  }

  startChain(chainName: string, target: string): Observable<string> {
    return this.setChainParameters({
      chainName,
      target,
      parameters: {
        startChain: true,
      }
    });
  }

  stopChain(chainName: string, target: string): Observable<string> {
    return this.setChainParameters({
      chainName,
      target,
      parameters: {
        stopChain: true,
      }
    });
  }

  switchChainTo(chainToStop: string, chainToStart: string, target: string): Observable<string> {
    return this.setChainParameters({
      chainName: chainToStop,
      target,
      parameters: {
        switchChain: chainToStart,
      }
    });
  }
}
