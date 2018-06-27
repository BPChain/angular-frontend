import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ChainSelectorService,
  ChainSelection,
} from '../services/chain-selector.service';
import { DataRetrieverService, ChainData } from '../services/data-retriever.service';
import {CONFIG} from '../../config';
import {RecordingHandlerService} from '../services/recording-handler.service';
import metricCalculator from './metric-calculation-helper';
import metricDescriptions from './metric-descriptions';


@Component({
  selector: 'app-data-visualization-bar',
  templateUrl: './data-visualization-bar.component.html',
  styleUrls: ['./data-visualization-bar.component.scss']
})
export class DataVisualizationBarComponent implements OnInit {
  public selectedChains: ChainSelection;
  public selectedTimeSpan: string;
  public timeFrame: Object;
  public selectedReplayChains: ChainSelection;
  public dataset: Array<ChainData>;
  public update: Boolean;
  public metrics: Object;
  public showTimeSpanSelection: Boolean;
  public descriptions: Object;
  public tps: number;
  public pld: number;

  @ViewChild('linechart') linechart;

  constructor(
    private _chainSelector: ChainSelectorService,
    private _dataRetriever: DataRetrieverService,
    private _replayRetriever: RecordingHandlerService,
  ) {
    this.selectedChains = new ChainSelection([], []);
    this.selectedReplayChains = new ChainSelection([], []);
    this.dataset = [];
    this.metrics = metricCalculator.initMetricDataset();
    this.selectedTimeSpan = '30';
    this.showTimeSpanSelection = true;
    this.timeFrame = {};
    this.descriptions = metricDescriptions;
    this.tps = 0;
    this.pld = 0;
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
          this.metrics = metricCalculator.calculateMetrics(newChainData, this.tps, this.pld);
          if (redraw) {
            this.linechart.redraw();
          }
        }
      }, error => {
        console.warn(error);
        this.dataset = [];
      });
    } else if (redraw) {
      this.dataset = [];
      this.metrics = metricCalculator.initMetricDataset();
      this.linechart.redraw();
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
    this._replayRetriever.selectedRecordingChains.subscribe(
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
