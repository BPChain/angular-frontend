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
  private lineChartData: Array<any>;
  private lineChartLabels: Array<any>;
  private lineChartOptions: object;
  private lineChartColors: Array<any>;
  private lineChartLegend: boolean;
  private lineChartType: string;

  // Chain data
  private datasetStore: Array<any>;
  private datasets: object;

  // Controll chart reload
  private display: boolean;
  private refresh: boolean;

  constructor(private _dataRetriever: DataRetrieverService) {
    this.selectedChains = this.initDatasets();
    this.selectedParameter = '';
  }

  private initializeChart() {
    this.datasets = this.initDatasets();
    this.display = true;
    this.refresh = false;
    this.lineChartLabels = [
      '1', '2', '3', '4', '5', '6', '7', '8',
      '9', '10', '11', '12', '13', '14', '15',
    ];
    this.lineChartData = this.getDefaultDataset();
    this.lineChartOptions = {
      responsive: true,
      elements: { point: { radius: 0 } },
    };
    this.lineChartColors = [
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
    ];
    this.lineChartLegend = true;
    this.lineChartType = 'line';
  }

  private compareObjects(a, b): number {
    if (a['label'] < b['label']) {
      return -1;
    }
    if (a['label'] > b['label']) {
      return 1;
    }
    return 0;
  }

  public updateChart(datasets: object, parameter: string): void {
    let combinedDatasets: Array<object>;

    if (this.isEmptyDataset(datasets) || !parameter) {
      combinedDatasets = this.getDefaultDataset();
    } else {
      combinedDatasets = datasets['private'].map(chart => {
        return {
          data: chart[parameter],
          label: `Private-${chart['chainName']}`
        };
      });
      combinedDatasets = combinedDatasets.concat(
        datasets['public'].map(chart => {
          return {
            data: chart[parameter],
            label: `Public-${chart['chainName']}`
          };
      }));
    }
    this.lineChartData = combinedDatasets.sort(
      (a, b) => this.compareObjects(a, b)
    );
    if (this.refresh) {
      this.display = false;
      this.refresh = false;
      setTimeout(() => {
        this.display = true;
      }, 1);
    }
  }

  private isEmptyDataset(dataset): boolean {
    if (dataset['private'].length > 0) {
      return false;
    }
    if (dataset['public'].length > 0) {
      return false;
    }
    return true;
  }

  private updateDatasets(chainsToDisplay) {
    this.datasets = this.initDatasets();
    chainsToDisplay['private'].forEach(chain => {
        this._dataRetriever
          .getPrivateChainApiData(chain)
          .subscribe(res => {
            this.datasets['private'].push(res);
          });
      });
      chainsToDisplay['public'].forEach(chain => {
        this._dataRetriever
          .getPublicChainApiData(chain)
          .subscribe(res => {
            this.datasets['public'].push(res);
          });
      });
  }

  private trackChartDataUpdates() {
    setInterval(() => {
      if (
        this.isEmptyDataset(this.selectedChains) ||
        this.selectedParameter === ''
      ) {
        this.updateChart(this.initDatasets(), false);
      } else {
        if (!(this.isEmptyDataset(this.datasets))) {
          this.updateChart(this.datasets, this.selectedParameter);
        }
        this.updateDatasets(this.selectedChains);
      }
    }, 1000);
  }

  private initDatasets(): object {
    return {public: [], private: []};
  }

  private getDefaultDataset(): Array<object> {
    return [
      {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'No chain selected'}
    ];
  }

  // Initialize
  ngOnInit() {
    this.initializeChart();
    this.trackChartDataUpdates();
  }

  // Selection updates
  ngOnChanges() {
    this.refresh = true;
    this.updateDatasets(this.selectedChains);
  }

  // Events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
