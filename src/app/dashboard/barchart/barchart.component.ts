import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit, OnChanges {

  @Input() miners = 0;
  @Input() workers = 0;
  @Input() date: number;
  @Input() difficulty: number;
  @Input() block_time: number;

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
  this.barChartLabels = [2003, 2009, 2007, 2008, 2003, 2002, 2000];
  this.barChartData = [
    {data: [0, 59, 80, 81, 56, 55, 40], label: 'Public'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Private'}
  ];

}

ngOnChanges() {
  this.barChartLabels = [this.miners, this.workers, 2008, 2009, 2008, 2003, 2002];
  this.barChartData = [
    {data: [0, 59, 80, 81, 56, 55, 40], label: 'Public'},
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
