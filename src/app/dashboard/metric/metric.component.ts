import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PublicStats} from '../../services/PublicStats';
import {PrivateStats} from '../../services/PrivateStats';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() currentCheck: boolean;
  @Input() publicStats: PublicStats;
  @Input() privateStats: PrivateStats;

  ngOnInit() {
  }

  ngOnChanges() {

  }
}
