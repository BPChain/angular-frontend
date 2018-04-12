import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ChainData} from '../../services/data-retriever.service';
import {CHART_COLORS} from '../chart-colors';


interface ChartItem {
  label: string;
  data: Array<number>;
}

class LineChart {
  public options = {
    responsive: true,
    elements: {point: {radius: 0}},
  };
  public colors = CHART_COLORS;
  public showsLegend = true;
  public type = 'line';

  constructor(public data: Array<ChartItem>) {
  }
}

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnChanges, OnInit {

  @Input() dataset: Array<ChainData>;
  @Input() selectedParameter: string;


  // Chart.js parameter
  private lineChart: {
    data: Array<ChartItem>,
    options: object,
    colors: Array<any>,
    showsLegend: boolean,
    type: string
  };
  private labels: Array<string>;


  // Controll chart reload
  public display: boolean;

  constructor() {
    this.labels = this.defaultLabelset();
    this.lineChart = new LineChart(this.defaultDataset());
    this.dataset = [];
  }

  private updateLabels(newLabels: Array<string>): void {
    this.labels.length = 0;
    this.labels.push(...newLabels.map(label => {
      return new Date(label).toLocaleTimeString();
    }));
  }

  public updateChart(): void {
    if (this.dataset.length === 0) {
      this.displayEmptyChart();
      return;
    }
    this.lineChart = new LineChart(this.dataset.map(chain => ({
        data: chain[this.selectedParameter],
        label: chain['access'].concat('-', chain.chainName)
      })));
    this.updateLabels(this.dataset[0]['timeStamp']);
  }

  private displayEmptyChart() {
    this.lineChart = new LineChart(this.defaultDataset());
    this.updateLabels(this.defaultLabelset());
  }

  private defaultDataset(): Array<ChartItem> {
    return [
      {
        data: [0],
        label: 'No chain selected. Select Chains on the left.'
      }
    ];
  }

  public redraw(): void {
    this.display = false;
    setTimeout(() => {
      this.display = true;
    }, 1);
    this.updateChart();
  }

  private defaultLabelset(): Array<string> {
    return ['0'];
  }

  // Selection updates
  ngOnChanges() {
    this.updateChart();
  }

  ngOnInit() {
    this.redraw();
  }

  // Events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
