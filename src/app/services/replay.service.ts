import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ChainItem} from './chain-selector.service';


@Injectable()
export class ReplayService {

  public replaying: Boolean = false;
  public recordingTimes = {startTime: '', endTime: ''};
  public selectedChains$ = new BehaviorSubject<Array<ChainItem>>(new Array());
  constructor() { }

  setReplaying(isReplaying: Boolean, recordingTime: any) {
    this.replaying = isReplaying;
    this.recordingTimes = recordingTime;
  }

  isReplaying() {
    return this.replaying;
  }

  setSelectedChains(selectedChains: Array<ChainItem>) {
    this.selectedChains$.next(selectedChains);
  }
}
