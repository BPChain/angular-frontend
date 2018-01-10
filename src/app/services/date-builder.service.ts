import { Injectable } from '@angular/core';

@Injectable()
export class DateBuilderService {

  constructor() { }

  public convertDate(day:Date, hours: number, minutes: number) {
    day.setHours(hours);
    day.setMinutes(minutes);
    return day;
  }
}
