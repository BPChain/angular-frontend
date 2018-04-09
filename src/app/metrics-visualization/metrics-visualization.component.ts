import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-metrics-visualization',
  templateUrl: './metrics-visualization.component.html',
  styleUrls: ['./metrics-visualization.component.scss']
})
export class MetricsVisualizationComponent implements OnInit {

  @Input() selectedChains: Array<string>;

  public metricData: object;

  constructor() {
    this.metricData = {
      miningTime: [
        {data: 20, label: 'ethereum'},
        {data: 23, label: 'xain'},
      ]
    };
  }

  ngOnInit() {
  }

}
