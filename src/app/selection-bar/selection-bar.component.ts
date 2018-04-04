import {Component, Input, OnInit} from '@angular/core';
import { DataRetrieverService } from '../services/data-retriever.service';


@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {

  @Input() isAuthenticated: boolean;

  public chainInfo: Array<object>;

  constructor(
    private _dataRetriever: DataRetrieverService,
  ) {
    this.chainInfo = [];
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
}