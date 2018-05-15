import { Injectable } from '@angular/core';

@Injectable()
export class ReplayService {

  public replaying: Boolean = false;
  public recordingData: object;

  constructor() { }

  setReplaying(isReplaying: Boolean, data: object) {
    this.replaying = isReplaying;
    this.recordingData = data;
    console.log('Im Replay-Service: ' + this.replaying + ' mit daten: ' + data);
  }

  isReplaying() {
    return this.isReplaying;
  }

}
