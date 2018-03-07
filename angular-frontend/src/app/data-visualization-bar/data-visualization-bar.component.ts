import { Component, OnInit } from '@angular/core';
import { DataRetrieverService } from '../services/data-retriever.service';
import { ChainSelectorService } from '../services/chain-selector.service';


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
  private datasets: object;
  private selectedChains: object;

  private display: boolean;
  private refresh: boolean;

  private compareObjects(a, b): number {
    if (a['label'] < b['label']) {
      return -1;
    }
    if (a['label'] > b['label']) {
      return 1;
    }
    return 0;
  }

  public update(datasets): void {
    let combinedDatasets: Array<object>;

    if (this.isEmptyDataset(datasets)) {
      combinedDatasets = this.initDefaultDataset();
    } else {
      combinedDatasets = datasets['private'].map(chart => {
        return {data: chart.data, label: `Private-${chart.label}`};
      });
      combinedDatasets = combinedDatasets.concat(
        datasets['public'].map(chart => {
          return {data: chart.data, label: `Public-${chart.label}`};
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

  private initializeChart() {
    this.datasets = this.initDataset();
    this.display = true;
    this.refresh = false;
    this.selectedChains = this.initDataset();
    this.lineChartLabels = [
      '1', '2', '3', '4', '5', '6', '7', '8',
      '9', '10', '11', '12', '13', '14', '15',
    ];
    this.lineChartData = this.initDefaultDataset();
    this.lineChartOptions = {
      responsive: true,
      elements: { point: { radius: 0 } },
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

  private equalsSelection(selectionA, selectionB): boolean {
    if (selectionA['private'].length === selectionB['private'].length) {
      if (selectionA['public'].length === selectionB['public'].length) {
        return true;
      }
    }
    return false;
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

  private initDataset(): object {
    return {public: [], private: []};
  }

  private initDefaultDataset(): Array<object> {
    return [
      {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'No chain selected'}
    ];
  }

  private updateDatasets(chainsToDisplay) {
    this.datasets = this.initDataset();
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

  private trackData() {
    setInterval(() => {
      const chainsToDisplay = Object.assign(
        {},
        (this._chainSelector.getSelectedChains()),
      );

      if (this.isEmptyDataset(chainsToDisplay)) {
        this.update(this.initDataset());
      } else {
      if (!(this.isEmptyDataset(this.datasets))) {
        this.update(this.datasets);
      }
      if (!(this.equalsSelection(chainsToDisplay, this.selectedChains))) {
        this.refresh = true;
      }
        this.updateDatasets(chainsToDisplay);
        this.selectedChains = chainsToDisplay;
      }
    }, 200);
  }


  ngOnInit() {
    this.initializeChart();
    this.trackData();
  }
}
