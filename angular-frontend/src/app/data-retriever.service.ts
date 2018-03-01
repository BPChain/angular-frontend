import { Injectable } from '@angular/core';

@Injectable()
export class DataRetrieverService {

  constructor() { }

  getChainInfo(): object {
    return {
      labels: [1, 2, 3, 4, 5, 6],
      datasets: [
        {
          title: 'Ethereum',
          values: [10, 47, 42, 12, 54, 38],
          color: 'green',
        },
        {
          title: 'XAIN',
          values: [28, 93, 10, 21, 32, 13],
          color: 'black',
        },
      ]
    };
  }
}
