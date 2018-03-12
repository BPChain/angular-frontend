import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DataRetrieverService} from '../../services/data-retriever.service';

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
      colors: [
        { // blue
          backgroundColor: 'rgba(24, 108, 187, 0.2)',
          borderColor: 'rgb(24, 108, 187)',
          pointBackgroundColor: 'rgb(24, 108, 187)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(24, 108, 187,0.8)'
        },
        { // red
          backgroundColor: 'rgba(228, 46, 46, 0.2)',
          borderColor: 'rgb(228, 46, 46)',
          pointBackgroundColor: 'rgb(228, 46, 46)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(228, 46, 46,1)'
        },
        { // green
          backgroundColor: 'rgba(9, 211, 43, 0.2)',
          borderColor: 'rgb(9, 211, 43)',
          pointBackgroundColor: 'rgb(9, 211, 43)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(9, 211, 43,0.8)'
        },
        { // yellow
          backgroundColor: 'rgba(250, 235, 27, 0.2)',
          borderColor: 'rgb(250, 235, 27)',
          pointBackgroundColor: 'rgb(250, 235, 27)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(250, 235, 27,0.8)'
        },
        { // purple
          backgroundColor: 'rgba(155, 51, 216, 0.2)',
          borderColor: 'rgb(155, 51, 216)',
          pointBackgroundColor: 'rgb(155, 51, 216)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(155, 51, 216,0.8)'
        },
        { // orange
          backgroundColor: 'rgba(250, 66, 20, 0.2)',
          borderColor: 'rgb(250, 66, 20)',
          pointBackgroundColor: 'rgb(250, 66, 20)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(250, 66, 20,0.8)'
        },
        { // grey
          backgroundColor: 'rgba(110, 110, 110, 0.2)',
          borderColor: 'rgb(110, 110, 110)',
          pointBackgroundColor: 'rgb(110, 110, 110)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(110, 110, 110,0.8)'
        },
        { // turquoise
          backgroundColor: 'rgba(10, 190, 190, 0.2)',
          borderColor: 'rgb(10, 190, 190)',
          pointBackgroundColor: 'rgb(10, 190, 190)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(10, 190, 190,0.8)'
        },
        { // turquoise
          backgroundColor: 'rgba(231, 0, 193, 0.2)',
          borderColor: 'rgb(231, 0, 193)',
          pointBackgroundColor: 'rgb(231, 0, 193)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(231, 0, 193,0.8)'
        },
      ],
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
