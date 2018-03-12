import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import {ChainSelection} from './chain-selector.service';

export interface ChainData {
  access: string;
  avgBlocktime: Array<number>;
  avgDifficulty: Array<number>;
  avgGasPrice: Array<number>;
  avgHashrate: Array<number>;
  chainName: string;
  numberOfHosts: Array<number>;
  numberOfMiners: Array<number>;
}


@Injectable()
export class DataRetrieverService {

  constructor(private _http: HttpClient) {
  }

  getPublicChainApiData(chain: string): Observable<ChainData> {
    return this._http
      .get(`http://localhost:3000/api/public/${chain.toLowerCase()}`)
      .map(response => <ChainData>({...response, access: 'Public'}));
  }

  getPrivateChainApiData(chain: string): Observable<ChainData> {
    return this._http
      .get(`http://localhost:3000/api/private/${chain.toLowerCase()}`)
      .map(response => <ChainData>({...response, access: 'Private'}));
  }

  getChainData(selectedChains: ChainSelection): Observable<Array<ChainData>> {
    if (selectedChains.isEmpty()) {
      return Observable.create(
        observer => {
          observer.next([]);
          observer.complete();
        });
    }
    const responses$: Array<Observable<ChainData>> = [];
    selectedChains._private.forEach(chain => {
      responses$.push(this.getPrivateChainApiData(chain));
    });
    selectedChains._public.forEach(chain => {
      responses$.push(this.getPublicChainApiData(chain));
    });
    return Observable.forkJoin(...responses$);
  }
}
