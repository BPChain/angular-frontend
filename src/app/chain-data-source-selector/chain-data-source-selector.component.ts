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

  constructor(private chainSelectorService: ChainSelectorService) {
    this.selectedOptions = new ChainSelection([], []);
  }

  onSelectedPublicChainsChanged(list) {
    this.selectedOptions = new ChainSelection(
      list.map(item => ({isSelected: true, target: item.value.target, name: item.value.name})),
      this.selectedOptions._private
    );
    this.chainSelectorService.setSelectedChains(this.selectedOptions);
  }

  onSelectedPrivateChainsChanged(list) {
    this.selectedOptions = new ChainSelection(
      this.selectedOptions._public,
      list.map(item => ({isSelected: true, target: item.value.target, name: item.value.name}))
    );
    this.chainSelectorService.setSelectedChains(this.selectedOptions);
  }


  ngOnChanges() {
    this.privateChains = this.chainInfo
      .filter(element => element['accessability'] === 'private')
      .map(element => {
        const chain = this.selectedOptions._private.find(selected => (selected.name === element['chainName'] &&
          selected.target === element['target'])) || {name: element['chainName'], target: element['target'], isSelected: false}
        return chain
      });

    this.publicChains = this.chainInfo
      .filter(element => element['accessability'] === 'public')
      .map(element => {
        const chain = this.selectedOptions._public.find(selected => selected.name === element['chainName'] &&
          selected.target === element['target']) || {name: element['chainName'], target: element['target'], isSelected: false}
        return chain
      });
  }

}
