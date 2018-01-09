import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit, OnChanges{

  @Input() labels: string[];
  @Input() statistics: any;

  private lineChartType: string;
  private lineChartLegend: boolean;
  private lineChartOptions: any;
  private lineChartColors: Array<any>;
  private lineChartLabels = [];
  private lineChartData: Array<any>;

  constructor(private datePipe: DatePipe){

  }

  ngOnInit() {
    this.lineChartType = 'line';
    this.lineChartLegend = true;
    this.lineChartOptions = {
      responsive: true,
      elements: { point: { radius: 2 } },
    };
  this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
     ];

  }

  ngOnChanges() {
    this.lineChartData = [];
    this.lineChartLabels.length = 0;

    let dataHelperArray = [];
    let dateHelperArray = [];
    let dataArray = [];
    let dates = [];
    dataArray = this.statistics.map(record => {
      return record[this.labels[0]];
    });
    dates = this.statistics.map(record => {
      return this.datePipe.transform(record.timeStamp, 'short');
    });

    // TODO remove once backend is fixed
    let size = dataArray.length
    for(let j = 1; j <= 50; j++){
      let index = (Math.floor(size/50)) * j;
      dataHelperArray[j-1]=dataArray[index];
      dateHelperArray[j-1]=dates[index];
    }

    for (let i = 0; i < dateHelperArray.length; i++) {
      this.lineChartLabels.push(dateHelperArray[i]);
    }
      this.lineChartData = [
        {data: dataHelperArray, label: this.labels[0], borderWidth: [1]},
      ];



  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
