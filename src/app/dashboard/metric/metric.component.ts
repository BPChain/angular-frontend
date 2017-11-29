import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PublicStats} from '../../services/PublicStats';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent implements OnInit {

  constructor() { }

  @Input() publicStats: PublicStats;
  @Input() privateStats: PublicStats;

  ngOnInit() {
  }
}
