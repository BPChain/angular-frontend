import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})

export class BarchartComponent implements OnChanges {

  @Input() data: Array<object>;

  public barChartOptions: any;
  private dataBuffer: Array<object>;
  public barChartData: Array<object>;

  private service: object;

  constructor () {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true   // minimum value will be 0.
            }
      }]
    }
    };
    this.barChartData = [];
  }

  public update() {
    const dataBuffer = [];
    this.data.forEach(entry => {
      dataBuffer.push({
        data: [entry['data']],
        label: entry['label']
      });
    });
    this.barChartData = dataBuffer;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnChanges() {
    this.update();
  }
}
