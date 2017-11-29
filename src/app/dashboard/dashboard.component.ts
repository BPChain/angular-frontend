import {Component, OnDestroy, OnInit} from '@angular/core';
import { PublicStatsService, } from '../services/public-stats.service';
import { PublicStats} from '../services/PublicStats';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [PublicStatsService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  refresh = true;
  stats: PublicStats;
  interval: any;
  isDataLoaded = false;

  constructor(private publicStatsService: PublicStatsService) {
  }

  ngOnInit() {
    this.load();

    this.interval = setInterval(() => {
      if (this.refresh) {
        this.load();
      }
    }, 15000);
  }


  ngOnDestroy() {
    clearInterval(this.interval);
  }

  reset(): void {}

  private load() {
    this.publicStatsService.getPublicStats<PublicStats>()
      .subscribe(
        response => {
          console.log(response);
          this.stats = response;
        });
  }

}

