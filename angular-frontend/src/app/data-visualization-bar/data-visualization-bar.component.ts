import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataRetrieverService } from '../data-retriever.service';


@Component({
  selector: 'app-data-visualization-bar',
  templateUrl: './data-visualization-bar.component.html',
  styleUrls: ['./data-visualization-bar.component.scss']
})
export class DataVisualizationBarComponent implements OnInit, OnChanges {

  public chainDatasets: object;
  @Input() statistics: any[];

  constructor(private _dataRetrieverService: DataRetrieverService) { }

  ngOnInit() {
    this.chainDatasets = this._dataRetrieverService.getChainInfo();
    setInterval(() => {
      this.chainDatasets = this._dataRetrieverService.getChainInfo();
      console.info(this.chainDatasets)
    }, 4000);
  }

  ngOnChanges() {

  }

}
