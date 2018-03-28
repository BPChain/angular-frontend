import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit, OnChanges {

  @Input() labels: string[];
  @Input() max: number;
  @Input() statistics: any;

  public barChartType: string;
  public barChartLegend: boolean;
  public barChartOptions: any;
  public barChartLabels: string[];
  public barChartData: any[];

  ngOnInit() {
    this.barChartType = 'bar';
    this.barChartLegend = false;

    this.barChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: this.max,
          }
        }]
      }
    };

    this.barChartLabels = this.labels;
  }

  ngOnChanges() {
    this.barChartData = [];
    for (let i = 0; i < this.labels.length; i++) {
      this.barChartData.push(
        {data: [this.statistics[this.labels[i]]], label: this.labels[i]}
      );
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
