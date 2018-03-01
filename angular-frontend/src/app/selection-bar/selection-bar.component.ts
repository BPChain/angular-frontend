import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.scss']
})
export class SelectionBarComponent implements OnInit {
  privateChains = ['Ethereum', 'XAIN', 'Multichain', 'Hyperledger', 'Bitcoin'];
  publicChains = ['Bitcoin', 'Ethereum', 'Ripple', 'Vertcoin', 'Lightcoin', 'EVAPCoin', 'Example', 'Example', 'Example', 'Example'];


  constructor() { }

  ngOnInit() {
  }

}
