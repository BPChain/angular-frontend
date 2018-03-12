import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DataRetrieverService} from '../../services/data-retriever.service';
import {chartColors} from './chart-colors';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit, OnChanges {

  @Input() selectedChains: object;
  @Input() selectedParameter: string;


  // Chart.js parameter
  private lineChart: {
    data: Array<any>,
    labels: Array<string>,
    options: object,
    colors: Array<any>,
    showsLegend: boolean,
    type: string
  };


  // Controll chart reload
  private display: boolean;
  private refresh: boolean;

  constructor(private _dataRetriever: DataRetrieverService) {
  }

  private initializeChart() {
    this.display = true;
    this.refresh = false;
    this.lineChart = {
      labels: [
        '1', '2', '3', '4', '5', '6', '7', '8',
        '9', '10', '11', '12', '13', '14', '15',
      ],
      data: this.defaultDataset(),
      options: {
        responsive: true,
        elements: {point: {radius: 0}},
      },
      colors: chartColors,
      showsLegend: true,
      type: 'line',
    };
  }


  public updateChart(dataset): void {
    const dataToDisplay = dataset.map(chain => ({
      data: chain[this.selectedParameter],
      label: chain['access'].concat('-', chain['chainName'])
    }));
    this.lineChart.data = dataToDisplay;
    this.refreshChart();
  }

  private refreshChart() {
    if (this.refresh) {
      this.display = false;
      this.refresh = false;
      setTimeout(() => {
        this.display = true;
      }, 1);
    }
  }

  private displayEmptyChart() {
    this.lineChart.data = this.defaultDataset();
    this.refreshChart();
  }

  private updateDataAndChart() {
    if ((this.selectedChains['public'].length === 0) &&
      (this.selectedChains['private'].length === 0)) {
      this.displayEmptyChart();
    }
    const observable = this._dataRetriever.getChainData(this.selectedChains);
    observable.subscribe(x => this.updateChart(x));
  }

  private updateChartPeriodically() {
    setInterval(() => {
      console.log(this.lineChart);
      this.updateDataAndChart();
    }, 5000);
  }

  private defaultDataset(): Array<object> {
    return [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'No chain selected'
      }
    ];
  }

  // Initialize
  ngOnInit() {
    this.initializeChart();
    this.updateChartPeriodically();
  }

  // Selection updates
  ngOnChanges() {
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
