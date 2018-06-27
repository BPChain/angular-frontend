import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  OnChanges,
} from '@angular/core';
import {CHART_COLORS} from './chart-colors';

@Component({
  selector: 'app-plotly-barchart',
  templateUrl: './plotly-barchart.component.html',
  styleUrls: ['./plotly-barchart.component.scss']
})
export class PlotlyBarchartComponent implements OnInit, OnChanges {

  @Input() data: Array<object>;
  @Input() title: string;
  @ViewChild('plotlyBarChart') el: ElementRef;

  constructor() { }

  ngOnInit() {
    this.drawChart();
  }

  redraw () {
    this.drawChart();
  }

  drawChart() {
    if (this.data) {
      const element = this.el.nativeElement;

      const data = [this.data.reduce((dataset, value, index) => {
        dataset['x'].push(value['label']);
        dataset['y'].push(value['data']);
        return dataset;
      }, {
        x: [],
        y: [],
        type: 'bar',
          marker: {
            color: CHART_COLORS,
          },
      })];

      const style = {
        margin: {
          b: 20,
          r: 20,
          l: 50,
        },
        yaxis: {
          zeroline: true,
          fixedrange: true,
          rangemode: 'tozero',
          autorange: true
        },
        xaxis: {
          fixedrange: true,
        },
      };
      Plotly.purge(element);
      Plotly.plot(element, data, style, {displayModeBar: true});
    }
  }

  ngOnChanges() {
    this.redraw();
  }

  onResize(event) {
    this.redraw();
  }
}
