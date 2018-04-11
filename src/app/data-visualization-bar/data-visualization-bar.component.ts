import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ChainSelectorService,
  ChainSelection
} from '../services/chain-selector.service';
import { DataRetrieverService, ChainData } from '../services/data-retriever.service';

@Component({
  selector: 'app-data-visualization-bar',
  templateUrl: './data-visualization-bar.component.html',
  styleUrls: ['./data-visualization-bar.component.scss']
})
export class DataVisualizationBarComponent implements OnInit {
  public selectedChains: ChainSelection;
  public dataset: Array<ChainData>;
  public update: Boolean;
  public metrics: Object;
  public displayMetrics: Boolean;

  @ViewChild('linechart') linechart;

  constructor(
    private _chainSelector: ChainSelectorService,
    private _dataRetriever: DataRetrieverService,
  ) {
    this.selectedChains = new ChainSelection([], []);
    this.displayMetrics = true;
    this.dataset = [];
    this.metrics = {
      miningTime: [{data: 0, label: 'no chain selected'}],
      stability: [{data: 0, label: 'no chain selected'}],
      latency: [{data: 0, label: 'no chain selected'}],
      energyConsumption: [{data: 0, label: 'no chain selected'}],
      throughput: [{data: 202, label: 'ethereum'}],
    };
  }

  private initMetricDataset () {
    return {
      miningTime: [{data: 0, label: 'no chain selected'}],
      stability: [{data: 0, label: 'no chain selected'}],
      latency: [{data: 0, label: 'no chain selected'}],
      energyConsumption: [{data: 0, label: 'no chain selected'}],
      throughput: [{data: 0, label: 'no chain selected'}],
    };
  }

  private emptyMetricDataset () {
    return {
      miningTime: [],
      stability: [],
      latency: [],
      energyConsumption: [],
      throughput: [],
    };
  }

  private calculateMetrics(chainData: Array<ChainData>): void {
    const metricBuffer = this.emptyMetricDataset();
    chainData.forEach(entry => {
      metricBuffer['miningTime'].push({data: Math.random(), label: entry['chainName']});
      metricBuffer['stability'].push({data: Math.random(), label: entry['chainName']});
      metricBuffer['latency'].push({data: Math.random(), label: entry['chainName']});
      metricBuffer['energyConsumption'].push({data: Math.random(), label: entry['chainName']});
      metricBuffer['throughput'].push({data: Math.random(), label: entry['chainName']});
    });
    this.metrics = metricBuffer;
  }

  private redrawBarcharts(): void {
    this.displayMetrics = false;
    setTimeout(() => {
      this.displayMetrics = true;
    });
  }

  private updateDatasets(redraw: Boolean): void {
    if (!this.selectedChains.isEmpty()) {
      const observable = this._dataRetriever.getChainData(this.selectedChains);
      observable.subscribe(newChainData => {
        if (!this.selectedChains.isEmpty()) {
          this.dataset = newChainData;
          this.calculateMetrics(newChainData);
          if (redraw) {
            this.linechart.redraw();
            this.redrawBarcharts();
          }
        }
      });
    } else if (redraw) {
      this.dataset = [];
      this.metrics = this.initMetricDataset();
      this.linechart.redraw();
      this.redrawBarcharts();
    }
  }

  private trackSelectionUpdates(): void {
    this.update = true;
    this._chainSelector.selectedChains$.subscribe(
      newChainSelection => {
        this.selectedChains = newChainSelection;
        this.updateDatasets(true);
      });
  }

  ngOnInit() {
    this.trackSelectionUpdates();
    setInterval(
      () => {
        this.updateDatasets(false);
      },
      5000
    );
  }
}
