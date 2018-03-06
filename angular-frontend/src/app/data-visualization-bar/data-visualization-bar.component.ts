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

  public update(datasets): void {
    const combinedDatasets = datasets['private'].map(chart => {
        return {data: chart.data, label: `Private-${chart.label}`};
      });
    this.lineChartData = combinedDatasets.sort((a, b) => {
      return a.label > b.label;
    });
    if (this.refresh) {
      this.display = false;
      this.refresh = false;
      setTimeout(() => {
        this.display = true;
      }, 1);
    }
  }

  private initializeChart(chains: object) {
    this.datasets = {public: [], private: []};
    this.display = true;
    this.refresh = false;
    this.selectedChains = chains;
    this.lineChartLabels = [
      '1', '2', '3', '4', '5', '6', '7', '8',
      '9', '10', '11', '12', '13', '14', '15',
    ];
    this.lineChartData = this.selectedChains['private'].map(chain => {
      return {data: this.lineChartLabels.map(label => {
        return 0;
      }), label: `Private-${chain}`};
    });
    console.info(this.lineChartData);
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

  private arraysEqual(arrayA, arrayB) {
    if (arrayA.length !== arrayB.length) {
      return false;
    }
    for (let i = arrayA.length; i--;) {
        if (arrayA[i] !== arrayB[i]) {
          return false;
        }
    }
    return true;
}


  private equalsSelection(selectionA, selectionB): boolean {
    if (this.arraysEqual(selectionA['private'], selectionB['private'])) {
      if (this.arraysEqual(selectionA['public'], selectionB['public'])) {
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

  ngOnInit() {
    this.initializeChart({private: ['Ethereum'], public: []});

    setInterval(async () => {
      if (!(this.isEmptyDataset(this.datasets))) {
        this.update(this.datasets);
      }
      this.datasets = this.initDataset();



      console.info(this.selectedChains);
      const _selectedChains = this._chainSelector.getSelectedChains();
      console.info(_selectedChains);
      console.info(this.selectedChains);
      /*if (!(this.isEmptyDataset(_selectedChains))) {
        console.info(this.selectedChains);
        console.info(_selectedChains);
        if (!(this.equalsSelection(this.selectedChains, _selectedChains))) {
            this.selectedChains = _selectedChains;
            console.info(this.selectedChains);
            this.refresh = true;
        }
      }*/


        this.selectedChains = Object.assign(_selectedChains);
            this.refresh = true;



      if (!(this.isEmptyDataset(this.selectedChains))) {
        this.selectedChains['private'].forEach(chain => {
          this._dataRetriever
            .getPrivateChainApiData(chain)
            .subscribe(res => {
              this.datasets['private'].push(res);
            });
        });
        this.selectedChains['public'].forEach(chain => {
          this._dataRetriever
            .getPublicChainApiData(chain)
            .subscribe(res => {
              this.datasets['public'].push(res);
            });
        });
      }
    }, 3000);
  }
}
