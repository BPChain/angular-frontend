import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ChainSelectorService,
  ChainSelection
} from '../services/chain-selector.service';
import { DataRetrieverService, ChainData } from '../services/data-retriever.service';
import * as stats from 'stats-lite';

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

  private calculateMiningTime(entry): number {
    const parameter = entry['avgBlocktime'].filter(item => item !== 0);
    const sum = stats.sum(parameter) ;
    return (sum / parameter.length) || 0;
  }

  private calculateStability(entry): number {
    const result = stats.stdev(entry['avgBlocktime']) || 0;
    return result;
  }

  private calculateLatency(entry): number {
    return Math.random();
  }

  private calculateEnergyConsumption(entry): number {
    const costsPerHash = 0.098;
    const hashrateParameter = entry['avgHashrate'].filter(item => item !== 0);
    const numberOfMinersParameter = entry['numberOfMiners'].filter(item => item !== 0);
    const avgHashrate = (stats.sum(hashrateParameter) / hashrateParameter.length) || 0;
    const avgNumberOfMiners = (stats.sum(numberOfMinersParameter) / numberOfMinersParameter.length) || 0;
    return avgHashrate * avgNumberOfMiners * costsPerHash;
  }

  private calculateThroughput(entry): number {
    return Math.random();
  }

  private calculateMetrics(chainData: Array<ChainData>): void {
    const metricBuffer = this.emptyMetricDataset();
    chainData.forEach(entry => {
      metricBuffer['miningTime'].push({data: this.calculateMiningTime(entry), label: entry['chainName']});
      metricBuffer['stability'].push({data: this.calculateStability(entry), label: entry['chainName']});
      metricBuffer['latency'].push({data: this.calculateLatency(entry), label: entry['chainName']});
      metricBuffer['energyConsumption'].push({data: this.calculateEnergyConsumption(entry), label: entry['chainName']});
      metricBuffer['throughput'].push({data: this.calculateThroughput(entry), label: entry['chainName']});
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
