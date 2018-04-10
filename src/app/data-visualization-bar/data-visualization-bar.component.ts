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
  public metricData = {
    miningTime: [
      {data: 20, label: 'ethereum'},
      {data: 23, label: 'xain'},
    ],
    stability: [
      {data: 240, label: 'ethereum'},
      {data: 211, label: 'xain'},
    ],
    latency: [
      {data: 9, label: 'ethereum'},
      {data: 23, label: 'xain'},
    ],
    energyConsumption: [
      {data: 233, label: 'ethereum'},
      {data: 23, label: 'xain'},
    ],
    throughput: [
      {data: 202, label: 'ethereum'},
      {data: 232, label: 'xain'},
    ],
  };

  constructor(private _chainSelector: ChainSelectorService) {
    this.selectedChains = new ChainSelection([], []);
    console.info(this.metricData)
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
