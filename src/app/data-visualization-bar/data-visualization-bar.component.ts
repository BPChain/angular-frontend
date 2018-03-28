import {Component, OnInit} from '@angular/core';
import {
  ChainSelectorService,
  ChainSelection
} from '../services/chain-selector.service';

@Component({
  selector: 'app-data-visualization-bar',
  templateUrl: './data-visualization-bar.component.html',
  styleUrls: ['./data-visualization-bar.component.scss']
})
export class DataVisualizationBarComponent implements OnInit {
  public selectedChains: ChainSelection;

  constructor(private _chainSelector: ChainSelectorService) {
    this.selectedChains = new ChainSelection([], []);
  }

  private trackSelectionUpdates(): void {
    this._chainSelector.selectedChains$.subscribe(
      newChainSelection => this.selectedChains = newChainSelection
    );
  }

  ngOnInit() {
    this.trackSelectionUpdates();
  }
}
