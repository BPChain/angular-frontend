import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { DataRetrieverService } from '../services/data-retriever.service';


@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit, OnChanges {

  @Input() isAuthenticated: boolean;

  public chainInfo: Array<object>;
  public allRecordings: Array<object>;
  public isReplaying: Boolean;

  constructor(
    private _dataRetriever: DataRetrieverService,
  ) {
    this.chainInfo = [];
    this.allRecordings = [];
    this.isReplaying = false;
  }

  requestUpdate() {
    this._dataRetriever
    .chainInfo()
    .subscribe(result => {
      try {
        this.chainInfo = JSON.parse(result);
      } catch (error) {
        console.error('Could not parse JSON:', error);
      }
    });
  }

  ngOnInit() {
    this.requestUpdate();
  }

  ngOnChanges() {
    if (!this.isAuthenticated) {
      this.isReplaying = false;
    }
  }
  toggleReplay() {
    this.isReplaying = !this.isReplaying;
  }
}
