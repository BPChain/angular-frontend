import { Component, OnChanges, Input } from '@angular/core';
import { ChainSelectorService, ChainSelection } from '../services/chain-selector.service';


@Component({
  selector: 'app-chain-data-source-selector',
  templateUrl: './chain-data-source-selector.component.html',
  styleUrls: ['./chain-data-source-selector.component.scss']
})
export class ChainDataSourceSelectorComponent implements OnChanges {

  @Input() chainInfo: Array<object>;

  public privateChains: Array<object>;
  public publicChains: Array<object>;
  public selectedOptions: ChainSelection;

  constructor(private _chainSelector: ChainSelectorService) {
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

  ngOnChanges() {
    this.privateChains = this.chainInfo
      .filter(element => element['accessability'] === 'private')
      .map(element => {
        return {name: element['chain'], target: element['target']};
      });
    this.publicChains = this.chainInfo
      .filter(element => element['accessability'] === 'public')
      .map(element => {
        return {name: element['chain'], target: element['target']};
      });
  }

}
