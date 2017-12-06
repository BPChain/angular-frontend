import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PublicStats} from '../../services/PublicStats';
import {PrivateStats} from '../../services/PrivateStats';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit, OnChanges {

  @Input() publicStats: PublicStats;
  @Input() privateStats: PrivateStats;

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
  this.barChartLegend = false;
  this.barChartLabels = ['numberOfMiners', 'numberOfWorkers', 'avgBlocktime'];
}

ngOnChanges() {
  this.barChartData = [
    {data: [this.publicStats.numberOfMiners, this.publicStats.numberOfWorkers, this.publicStats.avgBlocktime], label: 'Public'},
    {data: [this.privateStats.numberOfMiners, this.privateStats.numberOfHosts, this.privateStats.avgBlocktime], label: 'Private'}
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
