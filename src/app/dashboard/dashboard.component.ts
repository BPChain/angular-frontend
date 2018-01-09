import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrivateStatisticsService} from '../services/private-statistics.service';
import {PublicStatisticsService} from '../services/public-statistics.service';
import {PrivateStatistics} from '../services/PrivateStatistics';
import {PublicStatistics} from '../services/PublicStatistics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [PrivateStatisticsService, PublicStatisticsService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  interval: any;
  refresh = true;

  privateCheck: boolean;
  publicCheck: boolean;
  startDate: Date;
  endDate: Date;

  currentPrivateStatistics: PrivateStatistics;
  currentPublicStatistics: PublicStatistics;
  timeBasedPublicStatistics: any; // TODO fix type
  timeBasedPrivateStatistics: any; // TODO fix type

  constructor(private privateStatisticsService: PrivateStatisticsService, private publicStatisticsService: PublicStatisticsService) { }

  ngOnInit() {
    this.loadLatestData();

    this.interval = setInterval(() => {
      if (this.refresh) {
        this.loadLatestData();
      }
    }, 10000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadLatestData() {
    this.loadLatestPrivateData();
    this.loadLatestPublicData();
  }

  loadLatestPrivateData() {
    this.privateStatisticsService.get()
      .subscribe(
        response => {
          this.currentPrivateStatistics = response[0];
        }
      );
  }

  loadLatestPublicData() {
    this.publicStatisticsService.get()
      .subscribe(
        response => {
          this.currentPublicStatistics = response[0];
        }
      );
  }

  loadRequestedData(userInput: Array<any>) {
    this.privateCheck = userInput[0];
    this.publicCheck = userInput[1];
    this.startDate = userInput[2];
    this.endDate = userInput[3];

    this.timeBasedPublicStatistics = null;
    this.timeBasedPrivateStatistics = null;
    if (this.startDate && this.endDate) {
      if (this.checkValidDates(this.startDate, this.endDate)) {
      this.loadTimeBasedPublicData(this.startDate, this.endDate);
      this.loadTimeBasedPrivateData(this.startDate, this.endDate);
      }
    }
  }

  loadTimeBasedPublicData(start: Date, end: Date) {
      const query = 'startTime=' + start.toISOString() + '&endTime=' + end.toISOString();
      this.publicStatisticsService.query(query)
        .subscribe(
          response => {
            this.timeBasedPublicStatistics = response;
          }
        );
  }

  loadTimeBasedPrivateData(start: Date, end: Date) {
      const query = 'startTime=' + start.toISOString() + '&endTime=' + end.toISOString();
      console.log(start.toISOString());
      this.privateStatisticsService.query(query)
      .subscribe(
        response => {
          this.timeBasedPrivateStatistics = response;
        }
      );
  }

   checkValidDates(start: Date, end: Date) {
    return start < end;
  }
}


