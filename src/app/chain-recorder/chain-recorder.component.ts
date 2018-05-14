import {Component, OnInit, Input} from '@angular/core';
import {RecordingService} from '../services/recording.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-chain-recorder',
  templateUrl: './chain-recorder.component.html',
  styleUrls: ['./chain-recorder.component.scss']
})
export class ChainRecorderComponent implements OnInit {


  public isRecording: Boolean = false;
  public creationDate: number = null;
  public recordingTime: Object = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  public recordingName: String;
  @Input() isAuthenticated: Boolean;

  constructor(private _recorder: RecordingService, public snackBar: MatSnackBar) {}

  onStartedRecording() {
    this._recorder.isRecording()
      .subscribe(recording => {
        this.isRecording = recording['isRecording'];
        if (!this.isRecording) {
          this._recorder.startRecording(this.recordingName)
            .subscribe(result => {
              if (result === 'OK') {
                this.isRecording = true;
                this.creationDate = Date.now();
                this.openSnackBar('Started recording successfully');
              }
            });
        } else {
          this.openSnackBar('Sorry, someone else in currently recording');
          this.creationDate = recording['creationDate'];
          this.recordingName = recording['recordingName'];
        }
      });
  }

  onStoppedRecording() {
    this._recorder.stopRecording()
      .subscribe(result => {
        if (result === 'OK') {
          this.isRecording = false;
          this.creationDate = null;
          this.openSnackBar('Stopped recording successfully');
        }
      });
  }


  ngOnInit() {
    this._recorder.isRecording()
      .subscribe(result => {
        this.isRecording = result['isRecording'];
        if (this.isRecording) {
          this.creationDate = result['creationDate'];
          this.recordingName = result['recordingName'];
        } else {
          this.creationDate = null;
        }
      });    this.calculateTime();
  }

  calculateTime() {
    setInterval(() => {if (this.isRecording) {
      let timeDelta = (Date.now() - this.creationDate) / 1000;
      this.recordingTime['hours'] = Math.floor(timeDelta / 3600);
      timeDelta = timeDelta - this.recordingTime['hours'] * 3600;
      this.recordingTime['minutes'] = Math.floor( timeDelta / 60);
      timeDelta = timeDelta - this.recordingTime['minutes'] * 60;
      this.recordingTime['seconds'] = Math.floor(timeDelta);

    }}, 1000);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

}
