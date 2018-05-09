import {Component, OnInit, Input, OnChanges, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RecordingService} from '../services/recording.service';
@Component({
  selector: 'app-chain-recorder-display',
  templateUrl: './chain-recorder-display.component.html',
  styleUrls: ['./chain-recorder-display.component.scss']
})
export class ChainRecorderDisplayComponent implements OnInit, OnDestroy {


  allRecordings: Array<object> = [];
  selectedRecording: object;
  isReplaying: Boolean = false;
  private interval;


  constructor(private _recordingService: RecordingService) {
  }

  ngOnInit() {
    this.getRecordings();
    this.interval = setInterval(() => {
      if (!this.isReplaying) {
        this.getRecordings();
      }
     }, 10000);
  }

  getRecordings() {
    this._recordingService
      .allRecordings()
      .subscribe(result => {
        const newRecordings = result.filter(recording => recording['recordingName'] !== '');
        if (JSON.stringify(this.allRecordings) !== JSON.stringify(newRecordings)) {
          this.allRecordings = newRecordings;
        }
      });
  }

  startReplay() {
    this.isReplaying = true;
    console.log('Start replaying');
    console.log(this._recordingService.getRecordingData(this.selectedRecording['_id']));
    console.log(this.selectedRecording['_id'], this.selectedRecording['recordingName']);
  }

  stopReplay() {
    this.isReplaying = false;
    console.log('Stop replaying');
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
