import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataRetrieverService {

  constructor(private _http: HttpClient) { }

  getPublicChainApiData(chain) {
    return this._http
      .get(`http://localhost:3000/api/public/${chain.toLowerCase()}`)
      .map(result => result);
  }

  getPrivateChainApiData(chain) {
    return this._http
      .get(`http://localhost:3000/api/private/${chain.toLowerCase()}`)
      .map(result => result);
  }
}
