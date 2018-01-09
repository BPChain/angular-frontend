import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  publicChecked = false;
  privateChecked = false;
  startDate: Date;
  endDate: Date;

  @Output() showData: EventEmitter<any> = new EventEmitter();

  minDate = new Date('2017-12-20');
  maxDate = new Date(Date.now());

  constructor() { }

  ngOnInit() {
  }

  emitEvent() {
    this.showData.emit([this.privateChecked, this.publicChecked, this.startDate, this.endDate]);
  }

}
