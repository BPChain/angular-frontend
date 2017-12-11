import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PrivateStats} from '../../../services/PrivateStats';

@Component({
  selector: 'app-private-charts',
  templateUrl: './private-charts.component.html',
  styleUrls: ['./private-charts.component.css']
})

export class PrivateChartsComponent implements OnInit, OnChanges {
  avgBlocktime: any[];
  avgHashrate: any[];
  minersWorkers: any[];


  avgBlocktimeLabel = ['average Blocktime'];
  avgHashrateLabel = ['average Hashrate'];
  minersWorkersLabel = ['Miners and Workers'];

  @Input() privateStats: PrivateStats;

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
          max: 30000,
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
          max: 10,
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
      {data: [this.privateStats.avgBlocktime]},
    ];
    this.avgHashrate = [
      {data: [this.privateStats.avgHashrate]},
    ];
    this.minersWorkers = [
      {data: [this.privateStats.numberOfMiners], label: 'number of Miners'},
      {data: [this.privateStats.numberOfHosts], label: 'number of Workers'},
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
