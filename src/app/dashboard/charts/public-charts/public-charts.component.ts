import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PublicStatistics} from '../../../services/PublicStatistics';

@Component({
  selector: 'app-public-charts',
  templateUrl: './public-charts.component.html',
  styleUrls: ['./public-charts.component.css']
})
export class PublicChartsComponent implements OnInit, OnChanges  {

  @Input() currentPublicData: PublicStatistics;
  @Input() publicData?: any; // TODO fix type

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
