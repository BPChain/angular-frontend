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
  private selectedParameter: string;

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

  private trackSelectionUpdates(): void {
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

  private changeDisplayedParameter(parameter: string): void {
    if (parameter !== this.selectedParameter) {
      this.selectedParameter = parameter;
    }
  }

  ngOnInit() {
    this.selectedChains = this.initDatasets();
    this.selectedParameter = '';
    this.trackSelectionUpdates();
  }
}
