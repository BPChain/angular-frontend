import {Component} from '@angular/core';
import {
  ChainSelectorService,
  ChainSelection
} from '../services/chain-selector.service';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})

export class SelectionBarComponent {
  public privateChains: Array<{ name: string, selected: boolean }>;
  public publicChains: Array<{ name: string, selected: boolean }>;
  public selectedOptions: ChainSelection;

  constructor(private _chainSelector: ChainSelectorService) {
    this.privateChains = [
      'Ethereum',
      'XAIN',
      'Multichain',
    ].map(chain => ({name: chain, selected: false}));

    this.publicChains = [
      'Bitcoin',
      'Ethereum',
      'Ripple',
      'Vertcoin',
      'Lightcoin',
      'EVAPCoin',
    ].map(chain => ({name: chain, selected: false}));
    this.selectedOptions = new ChainSelection([], []);
  }


  onSelectedPublicChainsChanged(list) {
    this.selectedOptions = new ChainSelection(
      list.map(item => item.value),
      this.selectedOptions._private
    );
    this._chainSelector.setSelectedChains(this.selectedOptions);
  }

  onSelectedPrivateChainsChanged(list) {
    this.selectedOptions = new ChainSelection(
      this.selectedOptions._public,
      list.map(item => item.value)
    );
    this._chainSelector.setSelectedChains(this.selectedOptions);
  }
}
