import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PublicStats} from '../../services/PublicStats';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit, OnChanges {
   @Input() publicData;
   data: number[];
   labels: any[] = [];

  constructor() {
    this.data = [0];
  }

  public lineChartData: Array<any> = [
    {data: this.data, label: 'Avg Hashrate'}
  ];

  public lineChartLabels: Array<any>;
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    for (const record of this.publicData) {
      this.data.push(record.avgHashrate);
      this.labels.push(new Date(record.timeStamp));
    }
    this.lineChartData = [{data: this.data, label: 'Avg Hashrate'}];
    this.lineChartLabels = this.labels;
  }


  ngOnChanges() {

  }

}
