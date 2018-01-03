import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  publicChecked = false;
  privateChecked = false;

  options: DatepickerOptions = {
    minYear: 2017,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    minDate: new Date('2017-12-13'), // Minimal selectable date
    maxDate: new Date(Date.now())  // Maximal selectable date
  };

 @Output() load: EventEmitter<any> = new EventEmitter();

  private check = false;
  private startDate: Date;
  private endDate: Date;
  
  constructor() {
    this.startDate = new Date();
    this.endDate = new Date()
   }

  ngOnInit() {
  }

  emitEvent() {
    this.load.emit([this.publicChecked, this.privateChecked, this.startDate, this.endDate]);
  }

}
