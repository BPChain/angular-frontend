import { Component, OnInit } from '@angular/core';
import { ChainSelectorService } from '../services/chain-selector.service';
import { LinechartComponent } from '../charts/linechart/linechart.component';


@Component({
  selector: 'app-data-visualization-bar',
  templateUrl: './data-visualization-bar.component.html',
  styleUrls: ['./data-visualization-bar.component.scss']
})
export class DataVisualizationBarComponent implements OnInit {
  private selectedChains: object;

  constructor(private _chainSelector: ChainSelectorService) {

  }

  private equalsSelection(selectionA, selectionB): boolean {
    if (selectionA['private'].length === selectionB['private'].length) {
      if (selectionA['public'].length === selectionB['public'].length) {
        return true;
      }
    }
    return false;
  }

  private trackSelectionUpdates() {
    setInterval(() => {
      const chainsToDisplay = Object.assign(
        {},
        (this._chainSelector.getSelectedChains()),
      );
      if (!(this.equalsSelection(this.selectedChains, chainsToDisplay))) {
        this.selectedChains = chainsToDisplay;
      }

    }, 500);
  }

  private initDatasets(): object {
    return {public: [], private: []};
  }

  ngOnInit() {
    this.selectedChains = this.initDatasets();
    this.trackSelectionUpdates();
  }
}
