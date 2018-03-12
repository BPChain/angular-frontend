import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';


@Injectable()
export class DataRetrieverService {

  constructor(private _http: HttpClient) {
  }

  getPublicChainApiData(chain) {
    return this._http
      .get(`http://localhost:3000/api/public/${chain.toLowerCase()}`)
      .map(result => Object.assign(result, {access: 'Public'}));
  }

  getPrivateChainApiData(chain) {
    return this._http
      .get(`http://localhost:3000/api/private/${chain.toLowerCase()}`)
      .map(result => Object.assign(result, {access: 'Private'}));
  }

  getChainData(selectedChains) {
    //Todo remove any with real type declaration
    const responses$: Array<Observable<any>> = [];
    selectedChains['private'].forEach(chain => {
      responses$.push(this.getPrivateChainApiData(chain));
    });
    selectedChains['public'].forEach(chain => {
      responses$.push(this.getPublicChainApiData(chain));
    });
    return Observable.forkJoin(...responses$);
  }

  setChainParameters(parameters: object) {
    return this._http
    .post(
      `http://localhost:3000/changeParameters`,
      parameters,
      {responseType: 'text'},
    );
  }
}
