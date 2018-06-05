import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '../../config';
import {Observable} from 'rxjs/Observable';
import {ChainData} from './data-retriever.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ChainSelection} from './chain-selector.service';

@Injectable()
export class RecordingHandlerService {

  public replaying: Boolean = false;
  public recordingTimes = {startTime: '', endTime: ''};
  public selectedRecordingChains = new BehaviorSubject<ChainSelection>(
    new ChainSelection([], [])
  );

  constructor(private _http: HttpClient) { }

  startRecording(name: String) {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.startRecording,
        {'name': name},
        {responseType: 'text', withCredentials: true},
      );
  }

  stopRecording() {
    return this._http
      .post(
        CONFIG.url.base + CONFIG.url.stopRecording,
        {},
        {responseType: 'text', withCredentials: true},
      );
  }

  isRecording() {
    return this._http
      .get(
        CONFIG.url.base + CONFIG.url.isRecording,
        {responseType: 'json', withCredentials: true},
      );  }

  allRecordings(): Observable<any> {
    return this._http
      .get(
        CONFIG.url.base + CONFIG.url.recordings,
        {responseType: 'json', withCredentials: true},
      );
  }

  getRecordingData(id: String) {
    return ('Hier könnte ihre Recording Data stehen: ' + id);
  }



  setReplaying(isReplaying: Boolean, recordingTime: any) {
    this.replaying = isReplaying;
    this.recordingTimes = recordingTime;
  }

  isReplaying() {
    return this.replaying;
  }

  setSelectedChains(selectedChains: ChainSelection) {
    this.selectedRecordingChains.next(selectedChains);
  }
}
