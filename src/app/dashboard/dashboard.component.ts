import {Component, OnDestroy, OnInit} from '@angular/core';
import { PublicStatsService, } from '../services/public-stats.service';
import { PublicStats} from '../services/PublicStats';
import {PrivateStatsService} from '../services/private-stats.service';
import {PrivateStats} from '../services/PrivateStats';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [PublicStatsService, PrivateStatsService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  refresh = true;
  publicStats: PublicStats;
  privateStats: PrivateStats;
  interval: any;

  constructor(private publicStatsService: PublicStatsService, private privateStatsService: PrivateStatsService) {
  }

  ngOnInit() {
    this.load();

    this.interval = setInterval(() => {
      if (this.refresh) {
        this.load();
      }
    }, 10000);
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
          this.publicStats = response;
        });
    this.privateStatsService.getPrivateStats<PrivateStats>()
      .subscribe(
        response => {
          console.log(response);
          this.privateStats = response;
        });
  }

}

