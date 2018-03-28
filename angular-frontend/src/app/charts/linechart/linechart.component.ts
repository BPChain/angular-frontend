import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {
  DataRetrieverService,
  ChainData
} from '../../services/data-retriever.service';
import {CHART_COLORS} from './chart-colors';
import {ChainSelection} from '../../services/chain-selector.service';


interface ChartItem {
  label: string;
  data: Array<number>;
}

class LineChart {
  public options = {
    responsive: true,
    elements: {point: {radius: 0}},
  };
  public colors = CHART_COLORS;
  public showsLegend = true;
  public type = 'line';

  constructor(public data: Array<ChartItem>) {
  }
}

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit, OnChanges {

  @Input() selectedChains: ChainSelection;
  @Input() selectedParameter: string;


  // Chart.js parameter
  private lineChart: {
    data: Array<ChartItem>,
    options: object,
    colors: Array<any>,
    showsLegend: boolean,
    type: string
  };
  private labels: Array<string>;


  // Controll chart reload
  private display: boolean;
  private refresh: boolean;

  constructor(private _dataRetriever: DataRetrieverService) {
    this.labels = this.defaultLabelset();
    this.lineChart = new LineChart(this.defaultDataset());
  }

  private initializeChart() {
    this.lineChart = {
      data: this.defaultDataset(),
      options: {
        responsive: true,
        elements: {point: {radius: 0}},
      },
      colors: CHART_COLORS,
      showsLegend: true,
      type: 'line',
    };
    this.refresh = false;
    this.display = true;
    console.log('linechart', this.lineChart);
  }

  private updateLabels(newLabels: Array<string>): void {
    this.labels.length = 0;
    this.labels.push(...newLabels.map(label => {
      return new Date(label).toLocaleTimeString();
    }));
  }

  public updateChart(dataset: Array<ChainData>): void {
    this.lineChart = new LineChart(dataset.map(chain => ({
        data: chain[this.selectedParameter],
        label: chain.access.concat('-', chain.chainName)
      })));
    this.updateLabels(dataset[0]['timeStamp']);
    this.refreshOnDemand();
  }

  private refreshOnDemand() {
    // To show new data-lines the chart must be shortly removed.
    if (this.refresh) {
      this.display = false;
      this.refresh = false;
      setTimeout(() => {
        this.display = true;
      }, 1);
    }
  }


  private displayEmptyChart() {
    this.lineChart = new LineChart(this.defaultDataset());
    this.updateLabels(this.defaultLabelset());
    this.refreshOnDemand();
  }

  private updateDataAndChart() {
    if (this.selectedChains.isEmpty()) {
      this.displayEmptyChart();
      return;
    }
    const observable = this._dataRetriever.getChainData(this.selectedChains);
    observable.subscribe(newChainData => this.updateChart(newChainData));
  }

  private updateChartPeriodically() {
    setInterval(() => {
      this.updateDataAndChart();
    }, 5000);
  }

  private defaultDataset(): Array<ChartItem> {
    return [
      {
        data: [0],
        label: 'No chain selected. Select Chains on the left.'
      }
    ];
  }

  private defaultLabelset(): Array<string> {
    return ['0'];
  }

  // Initialize
  ngOnInit() {
    this.refresh = true;
    this.refreshOnDemand();
    this.updateChartPeriodically();
  }

  // Selection updates
  ngOnChanges() {
    console.log(this.lineChart);
    this.refresh = true;
    this.updateDataAndChart();
  }

  // Events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
