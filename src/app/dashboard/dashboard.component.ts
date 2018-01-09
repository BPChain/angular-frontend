import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrivateStatisticsService} from "../services/private-statistics.service";
import {PublicStatisticsService} from "../services/public-statistics.service";
import {PrivateStatistics} from "../services/PrivateStatistics";
import {PublicStatistics} from "../services/PublicStatistics";

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
      )
  }

  loadLatestPublicData() {
    this.publicStatisticsService.get()
      .subscribe(
        response => {
          this.currentPublicStatistics = response[0];
        }
      )
  }

  loadRequestedData(userInput: Array<any>) {
    this.privateCheck = userInput[0];
    this.publicCheck = userInput[1];
    this.startDate = userInput[2];
    this.endDate = userInput[3];

    this.timeBasedPublicStatistics = null;
    if(this.startDate && this.endDate){
      this.loadTimeBasedData(this.startDate, this.endDate);
    }
  }

  loadTimeBasedData(start: Date, end: Date){
    if(this.checkValidDates(start, end)){
      let query = 'startTime=' + start.toISOString() + '&endTime=' + end.toISOString();
      this.publicStatisticsService.query(query)
        .subscribe(
          response => {
            this.timeBasedPublicStatistics = response;
          }
        )
    }
  }

   checkValidDates(start: Date, end: Date) {
    return start < end;
  }
}


