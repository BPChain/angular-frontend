import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DataRetrieverService } from '../services/data-retriever.service';
import { ChainSelectorService } from '../services/chain-selector.service';
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

  private datasetStore: Array<any>;
  private datasets: Array<any>;
  private selectedChains: Array<any>;

  private display: boolean;
  private refresh: boolean;

  public update(datasets): void {
    const _lineChartData: Array<any> = new Array(this.datasets.length);
    for (let i = 0; i < _lineChartData.length; i++) {
      _lineChartData[i] = {
        data: new Array(this.datasets[i].data.length),
        label: this.datasets[i].label,
      };
      for (let j = 0; j < this.datasets[i].data.length; j++) {
        _lineChartData[i].data[j] = datasets[i].data[j];
      }
    }
    this.lineChartData = _lineChartData;
    if (this.refresh) {
      this.display = false;
      this.refresh = false;
      setTimeout(() => {
        this.display = true;
      }, 1);
    }
  }

  private initializeChart(chains: Array<any>) {
    this.display = true;
    this.refresh = false;
    this.selectedChains = chains;
    this.lineChartLabels = [
      '1', '2', '3', '4', '5', '6', '7', '8',
      '9', '10', '11', '12', '13', '14', '15',
    ];
    this.lineChartData = this.selectedChains.map(chain => {
      return {data: this.lineChartLabels.map(label => {
        return 0;
      }), label: chain};
    });
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
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(
    private _dataRetriever: DataRetrieverService,
    private _chainSelector: ChainSelectorService
  ) {
  }



  ngOnInit() {
    this.initializeChart(['Ethereum']);


    setInterval(async () => {
      if (this.datasets) {
        this.update(this.datasets);
      }
      this.datasets = [];
      const _selectedChains = this._chainSelector.getSelectedChains();


      if (_selectedChains['private'].length) {
        if (_selectedChains['private'].length !== this.selectedChains.length) {
          this.refresh = true;
        }
        this.selectedChains = _selectedChains['private'];
      }

      if (this.selectedChains.length) {
        for (let i = 0; i < this.selectedChains.length; i++) {

          await this._dataRetriever
            .chainApiData(this.selectedChains[i])
            .subscribe(res => {
              this.datasets.push(res);
            });
        }
      }
    }, 1000);
  }
}
