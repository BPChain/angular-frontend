import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataRetrieverService} from '../services/data-retriever.service';
@Component({
  selector: 'app-chain-recorder-display',
  templateUrl: './chain-recorder-display.component.html',
  styleUrls: ['./chain-recorder-display.component.scss']
})
export class ChainRecorderDisplayComponent implements OnInit{


  allRecordings: Array<object> = [];
  selectedValue: object;


  constructor(private _dataRetriever: DataRetrieverService) {
  }

  ngOnInit() {
    this._dataRetriever
      .allRecordings()
      .subscribe(result => {
        try {
          this.allRecordings = JSON.parse(result);
        } catch (error) {
            console.error('Could not parse JSON:', error);
          }
        });
  }

}
