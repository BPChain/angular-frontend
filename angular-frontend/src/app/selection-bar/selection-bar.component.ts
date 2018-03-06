import { Component, OnInit } from '@angular/core';
import { ChainSelectorService } from '../services/chain-selector.service';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {
  public privateChains: Array<object>;
  public publicChains: Array<object>;
  public selectedOptions: object;

  constructor(private _chainSelector: ChainSelectorService) {
  }

  ngOnInit() {
    this.privateChains = [
      'Ethereum',
      'XAIN',
      'Multichain',
      'Hyperledger',
      'Bitcoin',
    ].map(chain => {
      return {name: chain, selected: false};
    });
    this.publicChains = [
      'Bitcoin',
      'Ethereum',
      'Ripple',
      'Vertcoin',
      'Lightcoin',
      'EVAPCoin',
      'Example',
      'Example',
      'Example',
      'Example',
    ].map(chain => {
      return {name: chain, selected: false};
    });
    this.selectedOptions = {public: [], private: []};
  }

  onSelectedPublicChainsChanged(list) {
    this.selectedOptions['public'] = list.selectedOptions.selected
      .map(item => item.value);
    this._chainSelector.setSelectedChains(this.selectedOptions);
  }

  onSelectedPrivateChainsChanged(list) {
    this.selectedOptions['private'] = list.selectedOptions.selected
      .map(item => item.value);
    this._chainSelector.setSelectedChains(this.selectedOptions);
  }
}
