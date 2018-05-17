import {
  Component, OnInit, OnDestroy,
  Output, EventEmitter
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RecordingService} from '../services/recording.service';
import {ReplayService} from '../services/replay.service';
import {MatSnackBar} from '@angular/material';
import {ChainItem, ChainSelection} from '../services/chain-selector.service';
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
  selectedChains: Array<ChainItem>;
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
    this.selectedChains = [];
    this._replayService.setSelectedChains(new ChainSelection([], []));
    this.openSnackBar('Stop replaying');
  }

  ngOnDestroy() {
    this.selectedChains = [];
    this._replayService.setSelectedChains(new ChainSelection([], []));
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
    const chainItems = this.selectedChains
      .map(chain => ({name: chain['name'], target: chain['target']}));
    const chainSelection = new ChainSelection([], chainItems);
    this._replayService.setSelectedChains(chainSelection);
  }



}
