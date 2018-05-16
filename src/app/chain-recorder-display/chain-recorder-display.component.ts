import {
  Component, OnInit, Input, OnChanges, OnDestroy,
  Output, EventEmitter
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RecordingService} from '../services/recording.service';
import {ReplayService} from '../services/replay.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-chain-recorder-display',
  templateUrl: './chain-recorder-display.component.html',
  styleUrls: ['./chain-recorder-display.component.scss']
})
export class ChainRecorderDisplayComponent implements OnInit, OnDestroy {

  @Output() toggleReplay: EventEmitter<any> = new EventEmitter();

  allRecordings: Array<object> = [];
  selectedRecording: object;
  isReplaying: Boolean = false;
  recordedChains: Array<object> = [];
  selectedChains: any;
    private interval;


  constructor(private _recordingService: RecordingService, private _replayService: ReplayService, public snackBar: MatSnackBar) {
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
    this.toggleReplay.emit(null);
    const selectedRecordingData = this.allRecordings.find(recording => recording['_id'] === this.selectedRecording['_id']);
    this.recordedChains = this.selectedRecording['chains'];
    const startTime = this.selectedRecording['startTime'];
    const endTime = this.selectedRecording['endTime'];
    this._replayService.setReplaying(this.isReplaying, {startTime: startTime, endTime: endTime});
    this.openSnackBar('Replay starting...');
  }

  stopReplay() {
    this.isReplaying = false;
    this.toggleReplay.emit(null);
    this._replayService.setReplaying(this.isReplaying, {startTime: '', endTime: ''});
    this.selectedChains = [{name: '', target: ''}];
    this._replayService.setSelectedChains(this.selectedChains);
    this.openSnackBar('Stop replaying');
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  updateSelectedChains() {
    this._replayService.setSelectedChains(this.selectedChains);
  }



}
