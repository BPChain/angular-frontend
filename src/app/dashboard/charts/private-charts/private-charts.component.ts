import {Component, Input, OnInit} from '@angular/core';
import {PrivateStatistics} from "../../../services/PrivateStatistics";

@Component({
  selector: 'app-private-charts',
  templateUrl: './private-charts.component.html',
  styleUrls: ['./private-charts.component.css']
})
export class PrivateChartsComponent implements OnInit {

  @Input() currentPrivateData: PrivateStatistics;

  constructor() { }

  ngOnInit() {
  }

}
