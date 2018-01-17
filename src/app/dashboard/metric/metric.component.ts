import {Component, Input, OnInit} from '@angular/core';
import {PublicStatistics} from '../../services/PublicStatistics';
import {PrivateStatistics} from '../../services/PrivateStatistics';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent implements OnInit {
  @Input() publicStatistics: PublicStatistics;
  @Input() privateStatistics: PrivateStatistics;

  constructor() { }

  ngOnInit() {
  }

}
