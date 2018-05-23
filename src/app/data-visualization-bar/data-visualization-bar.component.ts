import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ChainSelectorService,
  ChainSelection,
} from '../services/chain-selector.service';
import { DataRetrieverService, ChainData } from '../services/data-retriever.service';
import * as stats from 'stats-lite';
import {CONFIG} from '../../config';
import {ReplayService} from '../services/replay.service';


@Component({
  selector: 'app-data-visualization-bar',
  templateUrl: './data-visualization-bar.component.html',
  styleUrls: ['./data-visualization-bar.component.scss']
})
export class DataVisualizationBarComponent implements OnInit {
  public selectedChains: ChainSelection;
  public selectedTimeSpan: string;
  public timeFrame: object;
  public selectedReplayChains: ChainSelection;
  public dataset: Array<ChainData>;
  public update: Boolean;
  public metrics: Object;
  public displayMetrics: Boolean;
  public showTimeSpanSelection: Boolean;

  @ViewChild('linechart') linechart;

  constructor(
    private _chainSelector: ChainSelectorService,
    private _dataRetriever: DataRetrieverService,
    private _replayRetriever: ReplayService,
  ) {
    this.selectedChains = new ChainSelection([], []);
    this.selectedReplayChains = new ChainSelection([], []);
    this.displayMetrics = true;
    this.dataset = [];
    this.metrics = {
      miningTime: [{data: 0, label: 'no chain selected'}],
      stability: [{data: 0, label: 'no chain selected'}],
      latency: [{data: 0, label: 'no chain selected'}],
      energyConsumption: [{data: 0, label: 'no chain selected'}],
      throughput: [{data: 202, label: 'ethereum'}],
    };
    this.selectedTimeSpan = '30';
    this.showTimeSpanSelection = true;
    this.timeFrame = {};
  }

  private initMetricDataset () {
    return {
      miningTime: [{data: 0, label: 'no chain selected'}],
      stability: [{data: 0, label: 'no chain selected'}],
      latency: [{data: 0, label: 'no chain selected'}],
      energyConsumption: [{data: 0, label: 'no chain selected'}],
      throughput: [{data: 0, label: 'no chain selected'}],
      dataTransfer: [{data: 0, label: 'no chain selected'}],
    };
  }

  private emptyMetricDataset () {
    return {
      miningTime: [],
      stability: [],
      latency: [],
      energyConsumption: [],
      throughput: [],
      dataTransfer: [],
    };
  }

  private calculateMiningTime(entry): number {
    try {
      if (entry['avgBlocktime']) {
        const parameter = entry['avgBlocktime'].filter(item => item !== 0);
        const sum = stats.sum(parameter) ;
        return (sum / parameter.length) || 0;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  private calculateStability(entry): number {
    try {
      if (entry['avgBlocktime']) {
        const parameter = entry['avgBlocktime'].filter(item => item !== 0);
        return stats.stdev(parameter) || 0;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  private calculateLatency(entry): number {
    return Math.random();
  }

  private calculateEnergyConsumption(entry): number {
    try {
      const numberOfCpus = 4;
      const minConsumption = 105 * numberOfCpus;
      const maxConsumption = 130 * numberOfCpus;
      const consumptionDiff = maxConsumption - minConsumption;
      if (entry['avgCpuUsage'].length) {
        const cpuUsageParameter = entry['avgCpuUsage'].filter(item => item !== 0) || [];
        const avgCpuUsage = (stats.sum(cpuUsageParameter) / cpuUsageParameter.length) || 0;
        return minConsumption + consumptionDiff * avgCpuUsage / 100;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  private calculateThroughput(entry): number {
    try {
      if (entry['avgTransactions'] && entry['avgBlocktime']) {
        const transactionsParameter = entry['avgTransactions'].filter(item => item !== 0);
        const blocktimeParameter = entry['avgBlocktime'].filter(item => item !== 0);
        const avgTransactions = stats.sum(transactionsParameter) / transactionsParameter.length;
        const avgBlocktime = stats.sum(blocktimeParameter) / blocktimeParameter.length;
        return (avgTransactions / avgBlocktime) || 0;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  private calculateDataTransfer(entry): number {
    try {
      if (entry['numberOfHosts'] && entry['avgBlockSize'] && entry['avgBlocktime']) {
        const numberOfHostsParameter = entry['numberOfHosts'].filter(item => item !== 0);
        const avgNumberOfHosts = stats.sum(numberOfHostsParameter) / numberOfHostsParameter.length;
        const blocksizeParameter = entry['avgBlockSize'].filter(item => item !== 0);
        const blocktimeParameter = entry['avgBlocktime'].filter(item => item !== 0);
        const blocksizeAvg = stats.sum(blocksizeParameter) / blocksizeParameter.length;
        const blocktimeAvg = stats.sum(blocktimeParameter) / blocktimeParameter.length;
        return (blocksizeAvg / blocktimeAvg) * avgNumberOfHosts || 0;
      }
      return 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  }

  private calculateMetrics(chainData: Array<ChainData>): void {
    const metricBuffer = this.emptyMetricDataset();
    try {
      chainData.forEach(entry => {
        metricBuffer['miningTime'].push({data: this.calculateMiningTime(entry), label: entry['chainName']});
        metricBuffer['stability'].push({data: this.calculateStability(entry), label: entry['chainName']});
        metricBuffer['latency'].push({data: this.calculateLatency(entry), label: entry['chainName']});
        metricBuffer['energyConsumption'].push({data: this.calculateEnergyConsumption(entry), label: entry['chainName']});
        metricBuffer['throughput'].push({data: this.calculateThroughput(entry), label: entry['chainName']});
        metricBuffer['dataTransfer'].push({data: this.calculateDataTransfer(entry), label: entry['chainName']});
      });
      this.metrics = metricBuffer;
    } catch (error) {
      console.warn(error);
      this.metrics = this.initMetricDataset;
    }
  }

  private redrawBarcharts(): void {
    this.displayMetrics = false;
    setTimeout(() => {
      this.displayMetrics = true;
    });
  }

  calculateTimeFrame(timeSpan: string): Object {
    const endTime = Date.now();
    const startTime = endTime - parseInt(timeSpan, 10) * 60 * 1000;
    return {
      startTime: (new Date(startTime)).toISOString(),
      endTime: (new Date(endTime)).toISOString(),
    };
  }

  public updateDatasets(redraw: Boolean): void {

    let chains = new ChainSelection([], []);

    if (this._replayRetriever.isReplaying()) {
      this.showTimeSpanSelection = false;
      chains = this.selectedReplayChains;
      this.timeFrame = this._replayRetriever.recordingTimes;
    } else {
      this.showTimeSpanSelection = true;
      chains = this.selectedChains;
      this.timeFrame = this.calculateTimeFrame(this.selectedTimeSpan);
    }
    if (!chains.isEmpty()) {
      const observable = this._dataRetriever.getChainData(chains, this.timeFrame);
      observable.subscribe(newChainData => {
        if (!chains.isEmpty()) {
          this.dataset = newChainData;
          this.calculateMetrics(newChainData);
          if (redraw) {
            this.linechart.redraw();
            this.redrawBarcharts();
          }
        }
      }, error => {
        console.warn(error);
        this.dataset = [];
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

  private trackReplaySelection() {
    this.update = true;
    this._replayRetriever.selectedChains$.subscribe(
      newChainSelection => {
        this.selectedReplayChains = newChainSelection;
        this.updateDatasets(true);
      });
  }

  ngOnInit() {
    this.trackSelectionUpdates();
    this.trackReplaySelection();
    setInterval(
      () => {
        this.updateDatasets(false);
      },
      CONFIG.refreshTime
    );
  }
}
