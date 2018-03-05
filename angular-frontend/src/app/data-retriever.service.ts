import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class DataRetrieverService {

  public chainDatasets: object = {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        title: 'Ethereum',
        values: [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
        ],
        color: 'green',
      },
      {
        title: 'XAIN',
        values: [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
        ],
        color: 'black',
      },
    ]
  };
  private url = 'http://localhost:3000/api';

  constructor(@Inject(HttpClient) private http: HttpClient) {
    this.retrieveChainAPIInfo();
  }

  retrieveChainAPIInfo() {
    let buffer;
    setInterval(() => {
      buffer = this.http.get(this.url);
      buffer.subscribe(data => this.chainDatasets = data);
      console.info(this.chainDatasets);
    }, 3000);
  }

  getChainInfo(): object {
    return this.chainDatasets;
  }
}
