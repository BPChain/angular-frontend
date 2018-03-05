import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit, OnChanges {

  @Input() labels: string[];
  @Input() chainData: any[];

  private lineChartType: string;
  private lineChartLegend: boolean;
  private lineChartOptions: any;
  private lineChartColors: Array<any>;
  private lineChartLabels: Array<any>;
  private lineChartData: Array<any>;
  private chartReady = false;

  constructor() {
    this.lineChartData = [{data: [1,2,2,1,4], label: 'Ethereum'},{data: [11,2,22,1,4], label: 'Xain'}];
    this.lineChartLabels = [1,2,3,4,5];
    this.chainData = [];
    this.lineChartType = 'line';
    this.lineChartLegend = true;
    this.lineChartOptions = {
      responsive: true,
      elements: { point: { radius: 0 } },
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
      {
        backgroundColor: 'rgba(0,159,177,0.2)',
        borderColor: 'rgba(148,159,0,1)',
        pointBackgroundColor: 'rgba(148,0,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,0,0,0.8)'
      },
      {
        backgroundColor: 'rgba(30,19,127,0.2)',
        borderColor: 'rgba(108,133,0,1)',
        pointBackgroundColor: 'rgba(248,98,77,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,0,0,0.8)'
      },
     ];

  }

  ngOnInit() {

  }

 ngOnChanges() {
   if (this.chartReady) {
    this.lineChartData = this.chainData;
   }
 }
    /*
  this.lineChartData.length = 0;
  if (this.chainData) {
    this.lineChartData = this.chainData.forEach(chain => {
      this.lineChartData.push(chain);
    });
  }
    this.lineChartLabels = [1,2,3,4,5,6];
  }

 // [{data: this.chainData[0].data, label: this.chainData[0].label},{data: this.chainData[1].data, label: this.chainData[1].label}];


   /*
    this.lineChartData.length = 0;
    this.lineChartLabels.length = 0;
    this.chainData.forEach(chain => {
      this.lineChartData.push(chain.data);
    });
    this.labels.forEach(label => {
      this.lineChartLabels.push(label);
    });
    console.info('lineChartData: ', this.lineChartData);
    console.info('lineChartLabels: ', this.lineChartLabels);
  }*/


  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }
}
