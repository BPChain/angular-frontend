import { MatSnackBar } from '@angular/material';
import {Component, Input} from '@angular/core';
import {
  ChainSelectorService,
  ChainSelection
} from '../services/chain-selector.service';
import { DataRetrieverService } from '../services/data-retriever.service';


@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent {

  @Input() isAuthenticated: boolean;

  public privateChains: Array<{ name: string, selected: boolean }>;
  public publicChains: Array<{ name: string, selected: boolean }>;
  public selectedOptions: ChainSelection;

  constructor(
    private _chainSelector: ChainSelectorService,
    private _dataRetriever: DataRetrieverService,
    public snackBar: MatSnackBar,
  ) {
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
