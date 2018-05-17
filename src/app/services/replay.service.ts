import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ChainSelection} from './chain-selector.service';


@Injectable()
export class ReplayService {

  public replaying: Boolean = false;
  public recordingTimes = {startTime: '', endTime: ''};
  public selectedChains$ = new BehaviorSubject<ChainSelection>(
    new ChainSelection([], [])
  );

  setReplaying(isReplaying: Boolean, recordingTime: any) {
    this.replaying = isReplaying;
    this.recordingTimes = recordingTime;
  }

  isReplaying() {
    return this.replaying;
  }

  setSelectedChains(selectedChains: ChainSelection) {
    this.selectedChains$.next(selectedChains);
  }
}
