import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import * as Plotly from 'plotly.js/dist/plotly.min.js';
import {ChainData} from '../../services/data-retriever.service';
import {CHART_COLORS} from './chart-colors';


@Component({
  selector: 'app-plotly-linechart',
  templateUrl: './plotly-linechart.component.html',
  styleUrls: ['./plotly-linechart.component.scss']
})
export class PlotlyLinechartComponent implements OnInit, OnChanges {

  @ViewChild('plotlyChart') el: ElementRef;
  @Input() dataset: Array<ChainData>;
  @Input() selectedParameter: string;

  constructor() { }

  ngOnInit() {
    this.drawChart();
  }

  redraw () {
    this.drawChart();
  }

  drawChart() {
    if (this.dataset) {
      const element = this.el.nativeElement;
      Plotly.purge(element);

      const data = this.dataset.map((chain, index) => {
        return {
          x: chain['timeStamp'],
          y: chain[this.selectedParameter],
          name: chain['chainName'],
          type: 'scatter',
          mode: 'lines',
          line: {
            width: 2,
            color: CHART_COLORS[index]
          },
          marker: {
            symbol: 100,
          }
        };
      });

      const style = {
        margin: {t: 40, r: 20},
        autosize: true,
        showlegend: true,
        legend: {
          orientation: 'h',
          y: 100000,
        }
      };

      Plotly.plot(element, data, style, {displayModeBar: false});
    }
  }

  ngOnChanges() {
    this.redraw();
  }

}
