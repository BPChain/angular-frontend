import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '../../config';
import {Observable} from 'rxjs/Observable';
import {ChainData} from './data-retriever.service';


@Injectable()
export class RecordingService {

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
        CONFIG.url.base + CONFIG.url.allRecordings,
        {responseType: 'json', withCredentials: true},
      );
  }

  getRecordingData(id: String) {
    return ('Hier könnte ihre Recording Data stehen: ' + id);
  }
}
