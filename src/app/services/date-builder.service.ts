import { Injectable } from '@angular/core';

@Injectable()
export class DateBuilderService {

  constructor() { }

  public convertDate(day: Date, hours: number, minutes: number) {
    if (hours != null) {
    day.setHours(hours);
    }
    if (minutes != null) {
    day.setMinutes(minutes);
    }
    return day;
  }
}
