import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PublicStats} from '../../services/PublicStats';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit, OnChanges {

  @Input() publicStats: PublicStats;
  @Input() privateStats: PublicStats;

  barChartOptions: any;
  barChartLabels: number[];
  barChartType: string;
  barChartLegend: boolean;
  barChartData: any[];

ngOnInit() {
  this.barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  this.barChartType = 'bar';
  this.barChartLegend = true;

}

ngOnChanges() {
  this.barChartLabels = [this.publicStats.activeMiners, this.publicStats.activeWorkers, 2008, 2009, 2008, 2003, 2002];
  this.barChartData = [
    {data: [this.publicStats.activeWorkers, 120000, 81, 56, 55, 40], label: 'Public'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Private'}
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
