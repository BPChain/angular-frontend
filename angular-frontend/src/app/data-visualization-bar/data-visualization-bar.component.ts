import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-visualization-bar',
  templateUrl: './data-visualization-bar.component.html',
  styleUrls: ['./data-visualization-bar.component.scss']
})
export class DataVisualizationBarComponent implements OnInit {

  data = [
    {
      title: "Ethereum",
      color: "light-blue",
      values: [25, 40, 30, 35, 8, 52, 17, -4]
    },
    {
      title: "Another Set",
      color: "violet",
      values: [25, 50, -10, 15, 18, 32, 27, 14]
    }
  ];

  dataSet = {
    labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am", "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"],
    datasets: this.data
  };

  constructor() { }

  ngOnInit() {

  }

}
