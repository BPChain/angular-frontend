import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DateBuilderService } from '../../services/date-builder.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DateBuilderService]
})
export class FormComponent implements OnInit {
  publicChecked = false;
  privateChecked = false;
  startDate: Date;
  endDate: Date;
  startHours: number;
  endHours: number;
  startMinutes: number;
  endMinutes: number;

  @Output() showData: EventEmitter<any> = new EventEmitter();

  minDate = new Date('2017-12-20');
  maxDate = new Date(Date.now());
  hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  minutes = [0,10,20,30,40,50]

  constructor(private DateBuilderService: DateBuilderService) { }

  ngOnInit() {
  }


  emitEvent() {
    this.startDate = this.DateBuilderService.convertDate(this.startDate, this.startHours, this.startMinutes);
    this.endDate = this.DateBuilderService.convertDate(this.endDate, this.endHours, this.endMinutes);
    this.showData.emit([this.privateChecked, this.publicChecked, this.startDate,this.endDate]);
  }

}
