import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataRetrieverService {

  constructor(private _http: HttpClient) { }

  chainApiData() {
    return this._http
      .get('http://localhost:3000/api/ethereum')
      .map(result => result);
  }

  /*private requestedChains = ['Multichain', 'XAIN', 'Ethereum'];

  public chainDatasets: object = {chainData: [], labels: []};
  private url = 'http://localhost:3000/api/';

  constructor(@Inject(HttpClient) private http: HttpClient) {
    this.retrieveChainAPIInfo();
  }

  retrieveChainAPIInfo() {
    setInterval(() => {
      const requestedData = [];
      this.requestedChains.forEach(chainName => {
        this.http.get(this.url + chainName.toLowerCase()).subscribe(data => {
          requestedData.push(data);
        });
      });
      this.chainDatasets = requestedData;
    }, 5000);
  }

  getChainInfo(): object {
    return {
      chainData: this.chainDatasets,
      labels: [1,2,3,4,5,6]
    };
  }

  setRequestedChains(chains) {
    this.requestedChains = chains;
  }*/
}
