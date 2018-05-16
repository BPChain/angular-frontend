import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class ReplayService {

  public replaying: Boolean = false;
  public recordingTimes = {startTime: '', endTime: ''};
  public selectedChains$ = new BehaviorSubject<Array<object>>(
    new Array({name: '', target: ''}));
  constructor() { }

  setReplaying(isReplaying: Boolean, recordingTime: any) {
    this.replaying = isReplaying;
    this.recordingTimes = recordingTime;
  }

  isReplaying() {
    return this.replaying;
  }

  setSelectedChains(selectedChains: Array<object>) {
    this.selectedChains$.next(selectedChains);
  }
}
