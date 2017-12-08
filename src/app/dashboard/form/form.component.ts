import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  publicChecked = false;
  privateChecked = false;

 @Output() load: EventEmitter<any> = new EventEmitter();

  private check = false;

  constructor() { }

  ngOnInit() {
  }

  emitEvent() {
    console.log("private" + this.privateChecked);
    console.log("public" + this.publicChecked);
    this.load.emit([this.publicChecked, this.privateChecked]);
  }

}
