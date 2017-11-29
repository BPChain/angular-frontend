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
  barChartLabels: string[];
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
  this.barChartLabels = ['activeMiners', 'activeWorkers', 'averageBlockTime'];

}

ngOnChanges() {
  this.barChartData = [
    {data: [this.publicStats.activeMiners, this.publicStats.activeWorkers, this.publicStats.averageBlockTime], label: 'Public'},
    {data: [280000, 400008, 13], label: 'Private'}
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
