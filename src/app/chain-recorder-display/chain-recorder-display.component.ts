import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-chain-recorder-display',
  templateUrl: './chain-recorder-display.component.html',
  styleUrls: ['./chain-recorder-display.component.scss']
})
export class ChainRecorderDisplayComponent implements OnInit, OnChanges {


  @Input() allRecordings: Array<object>;
  selectedValue: object;


  constructor() {
  }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log(this.selectedValue._id)
  }

}
