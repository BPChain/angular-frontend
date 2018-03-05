import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DataRetrieverService } from '../services/data-retriever.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-data-visualization-bar',
  templateUrl: './data-visualization-bar.component.html',
  styleUrls: ['./data-visualization-bar.component.scss']
})
export class DataVisualizationBarComponent implements OnInit {

  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions: object;
  public lineChartColors: Array<any>;
  public lineChartLegend: boolean;
  public lineChartType: string;

  private datasets: Array<any>;
  private selectedChains: Array<any>;

  public randomize(): void {
    const _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {
        data: new Array(this.lineChartData[i].data.length),
        label: this.lineChartData[i].label
      };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  public update(datasets): void {
    const _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {
        data: new Array(this.lineChartData[i].data.length),
        label: this.lineChartData[i].label
      };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = datasets[i].data[j];
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private _dataRetriever: DataRetrieverService) {
  }



  ngOnInit() {
    this.lineChartData = [
      {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Ethereum'},
      {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'XAIN'},
      {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Multichain'},
    ];
    this.lineChartLabels = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'
    ];
    this.lineChartOptions = {
      responsive: true
    };
    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(255, 78, 78, 0.2)',
        borderColor: 'rgb(255, 78, 78)',
        pointBackgroundColor: 'rgb(255, 78, 78)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(78, 90, 255, 0.2)',
        borderColor: 'rgb(78, 90, 255)',
        pointBackgroundColor: 'rgb(78, 90, 255)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(13, 158, 0, 0.2)',
        borderColor: 'rgb(13, 158, 0)',
        pointBackgroundColor: 'rgb(13, 158, 0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    this.lineChartLegend = true;
    this.lineChartType = 'line';
    this.selectedChains = ['Ethereum', 'Xain', 'Multichain'];

    setInterval(() => {
      if (this.datasets) {
        this.update(this.datasets);
      }
      this.selectedChains.forEach(chain => {
        console.info(`${chain} started`);

        this._dataRetriever
          .chainApiData(chain)
          .subscribe(res => {
            this.datasets.push(res);
            console.info(`${chain} done: ${res}`);

          });
      });
      console.info(this.datasets);

      this.datasets = [];
    }, 3000);
  }
}
