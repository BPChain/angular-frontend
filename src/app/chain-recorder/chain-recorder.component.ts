import { Component, OnInit, Input} from '@angular/core';
import {RecordingService} from '../services/recording.service';

@Component({
  selector: 'app-chain-recorder',
  templateUrl: './chain-recorder.component.html',
  styleUrls: ['./chain-recorder.component.scss']
})
export class ChainRecorderComponent implements OnInit {


  public isRecording: Boolean;
  public fileName: String;
  @Input() isAuthenticated: Boolean;

  constructor(private _recorder: RecordingService) { }

  onStartedRecording() {
    this._recorder.startRecording(this.fileName)
      .subscribe(result => {
        if (result === 'OK') {
          this.isRecording = true;
        }
        console.info(result);
      });
  }

  onStoppedRecording() {
    this._recorder.stopRecording()
      .subscribe(result => {
        if (result === 'OK') {
          this.isRecording = false;
        }
        console.info(result);
      });
  }


  ngOnInit() {
  }

}
