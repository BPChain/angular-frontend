import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PublicStats} from '../../../services/PublicStats';


@Component({
  selector: 'app-public-charts',
  templateUrl: './public-charts.component.html',
  styleUrls: ['./public-charts.component.css']
})
export class PublicChartsComponent implements OnInit, OnChanges {
  avgBlocktime: any[];
  avgHashrate: any[];
  minersWorkers: any[];

  avgBlocktimeLabel = ['average Blocktime'];
  avgHashrateLabel = ['average Hashrate'];
  minersWorkersLabel = ['Miners and Workers'];

  @Input() publicStats: PublicStats;

  avgBlocktimeOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 20,
        }
      }]
    }
  };

  avgHashrateOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 20000000,
        }
      }]
    }
  };

  minersWorkersOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 200000,
        }
      }]
    }
  };

  barChartType: string;
  barChartLegend: boolean;

  ngOnInit() {
    this.barChartType = 'bar';
    this.barChartLegend = false;
  }

  ngOnChanges() {
    this.avgBlocktime = [
      {data: [this.publicStats.avgBlocktime]},
    ];
    this.avgHashrate = [
      {data: [this.publicStats.avgHashrate]},
    ];
    this.minersWorkers = [
      {data: [this.publicStats.numberOfMiners], label: 'number of Miners'},
      {data: [this.publicStats.numberOfWorkers], label: 'number of Workers'},
    ];

  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
