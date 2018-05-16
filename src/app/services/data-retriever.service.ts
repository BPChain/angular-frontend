import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import {ChainSelection} from './chain-selector.service';
import {CONFIG} from '../../config';

export interface ChainData {
  access: string;
  avgBlocktime: Array<number>;
  avgDifficulty: Array<number>;
  avgGasPrice: Array<number>;
  avgHashrate: Array<number>;
  chainName: string;
  numberOfHosts: Array<number>;
  numberOfMiners: Array<number>;
  timestamp: Array<string>;
  target: string;
}


@Injectable()
export class DataRetrieverService {

  constructor(private _http: HttpClient) {
  }

  getPublicChainApiData(chain: string): Observable<ChainData> {
    return this._http
      .get(CONFIG.url.base + CONFIG.url.publicChain + chain.toLowerCase() + '?numberOfItems=100')
      .map(response => <ChainData>({...response, access: 'Public'}));
  }

  getPrivateChainApiData(chain: string, target: string): Observable<ChainData> {
    return this._http
      .get(CONFIG.url.base + CONFIG.url.privateChain + chain.toLowerCase() + `?target=${target}&numberOfItems=100`)
      .map(response => <ChainData>({...response, access: 'Private', target: target}));
  }

  getChainData(selectedChains: ChainSelection): Observable<Array<ChainData>> {
    if (selectedChains.isEmpty()) {
      return Observable.create(
        observer => {
          observer.next([]);
          observer.complete();
        });
    } else {
      const responses$ = selectedChains._private.map(
        chain => this.getPrivateChainApiData(chain['name'], chain['target']))
        .concat(selectedChains._public.map(
          chain => this.getPublicChainApiData(chain['name'])));
      return Observable.forkJoin(...responses$);
    }
  }

  getReplayData(selectedChains: Array<object>, recordingTimes: object): Observable<Array<ChainData>> {
    if (!selectedChains.length) {
      return Observable.create(
        observer => {
          observer.next([]);
          observer.complete();
        });
    } else {
      const responses$ = selectedChains.map(
        chain => this.getReplayApiData(chain['name'], chain['target'], recordingTimes['startTime'], recordingTimes['endTime']));
      return Observable.forkJoin(...responses$);
    }
  }

  getReplayApiData(chain: string, target: string, startTime: string, endTime: string) {
    return this._http
      .get(CONFIG.url.base + CONFIG.url.privateChain + chain.toLowerCase()
        + `?target=${target}&startTime=${startTime}&endTime=${endTime}&numberOfItems=100`)
      .map(response => <ChainData>({...response, access: 'Private', target: target}));
  }

  chainInfo(): Observable<string> {
    return this._http
      .get(
        CONFIG.url.base + CONFIG.url.chainInfo,
        {responseType: 'text', withCredentials: true},
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
