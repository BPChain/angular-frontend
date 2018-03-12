import { Component, Input, OnInit } from '@angular/core';
import { ChainSelectorService } from '../services/chain-selector.service';
import { DataRetrieverService } from '../services/data-retriever.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {

  @Input() isAuthenticated: boolean;

  public privateChains: Array<object>;
  public publicChains: Array<object>;
  public selectedOptions: object;

  constructor(
    private _chainSelector: ChainSelectorService,
    private _dataRetriever: DataRetrieverService,
    public snackBar: MatSnackBar,
  ) {  }

  ngOnInit() {
    this.privateChains = [
      'Ethereum',
      'XAIN',
      'Multichain',
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
    ].map(chain => {
      return {name: chain, selected: false};
    });
    this.selectedOptions = {public: [], private: []};
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  requestParameterChange(
    numberOfHosts,
    numberOfMiners,
    initialDifficulty,
    transactionsPerMin,
  ) {
    if (this.isAuthenticated) {
      this._dataRetriever
        .setChainParameters({
          numberOfHosts,
          numberOfMiners,
          initialDifficulty,
          transactionsPerMin,
        })
        .subscribe(result => {
          this.openSnackBar('Successfully changed parameters');
        },
        error => {
          this.openSnackBar('Parameter change was not successful');
        });
    } else {
      this.openSnackBar('You are not authorized to change parameters');
    }
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
