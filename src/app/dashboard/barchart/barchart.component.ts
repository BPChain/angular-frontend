import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent  {
  @Input() miners = 0;
  @Input() workers = 0;


  constructor() { }


}
