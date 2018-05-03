import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-chain-recorder',
  templateUrl: './chain-recorder.component.html',
  styleUrls: ['./chain-recorder.component.scss']
})
export class ChainRecorderComponent implements OnInit {


  public isRecording: Boolean;
  public fileName: String;
  @Input() isAuthenticated: Boolean;

  constructor() { }

  onStartedRecording() {
    this.isRecording = true;

  }

  onStoppedRecording() {
    this.isRecording = false;
  }


  ngOnInit() {
  }

}
