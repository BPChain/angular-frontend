import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataRetrieverService } from '../services/data-retriever.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-data-visualization-bar',
  templateUrl: './data-visualization-bar.component.html',
  styleUrls: ['./data-visualization-bar.component.scss']
})
export class DataVisualizationBarComponent implements OnInit {

  public chart: any;

  constructor(private _dataRetriever: DataRetrieverService) { }

  ngOnInit() {
    this._dataRetriever
      .chainApiData()
      .subscribe(res => {
        console.log(res['data']);

        this.chart = new Chart('schalala', {
          type: 'line',
          data: {
            labels: [1, 2, 3, 4, 5, 6],
            datasets: [ {
              data: res['data'],
              borderColor: '#386638',
              fill: false,
            }]
          },
          options: {
            legend: {display: false},
            scales: {
              xAxes: [
                {display: true}
              ],
              yAxes: [{
                display: true
              }]
            }
          }
        });
    });


  }
/*
  public chainData = [{}, {}, {}];
  public labels: Array<any>;
  public chartAvailable = false;
  public testText = '';

  constructor(private _dataRetrieverService: DataRetrieverService) { }

  ngOnInit() {
      let data = this._dataRetrieverService.getChainInfo();
      this.testText = data.toString();
      this.chainData = data['chainData'];
      this.labels = data['labels'];
      this.chartAvailable = true;
    setInterval(() => {
      data = this._dataRetrieverService.getChainInfo();
      this.testText = data.toString();
      this.chainData = data['chainData'];
      this.labels = data['labels'];
      this.chartAvailable = true;
    }, 3000);
  }

  ngOnChanges() {

  }*/

}
