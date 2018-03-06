import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ChainSelectorService implements OnInit {

  public selectedChains: object;

  constructor() { }

  ngOnInit() {
    this.selectedChains = {public: [], private: []};
  }

  setSelectedChains(chainSelection: object): void {
    this.selectedChains = chainSelection;
  }

  getSelectedChains(): object {
    if (this.selectedChains) {
      return this.selectedChains;
    }
    return {public: [], private: []};
  }

}
