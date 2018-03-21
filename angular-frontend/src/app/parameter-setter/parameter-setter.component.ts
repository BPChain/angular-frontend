import { Component, OnChanges, Input } from '@angular/core';
import {ParameterConfiguratorService} from '../services/parameter-configurator.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-parameter-setter',
  templateUrl: './parameter-setter.component.html',
  styleUrls: ['./parameter-setter.component.scss']
})
export class ParameterSetterComponent implements OnChanges {

  @Input() chainInfo: Array<object>;
  @Input() isAuthenticated: Boolean;

  public connectedNodes: Array<string>;
  public chains: Array<object>;
  public selectedNode: string;
  public selectedChain: string;
  public availableChains: Array<object>;
  public availableConfiguration: object;
  public chainSelector: Array<string>;
  public configuration: object;

  constructor(
    private _parameterConfigurator: ParameterConfiguratorService,
    private _snackBar: MatSnackBar,
  ) {
    this.connectedNodes = [];
    this.selectedChain = '';
    this.selectedNode = '';
    this.availableChains = [];
    this.availableConfiguration = {};
    this.chainSelector = [];
    this.configuration = {
      numberOfHosts: 0,
      numberOfMiners: 0,
      initialDifficulty: 0,
      transactionsPerMin: 0,
    };
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  updateChainSelection() {
    this.availableChains = this.chains
        .filter(element => element['target'] === this.selectedNode);
    this.chainSelector = this.availableChains.map(element => element['chain']);
  }

  updateConfiguration() {
    this.availableConfiguration = this.availableChains
      .find(element => element['chain'].toLowerCase() === this.selectedChain.toLowerCase())['parameters'];
    this.configuration = this.availableConfiguration;
  }

  requestParameterChange() {
    if (this.isAuthenticated) {
      this._parameterConfigurator
        .setChainParameters({
          target: this.selectedNode,
          chain: this.selectedChain['name'],
          parameters: this.configuration,
        })
        .subscribe(result => {
          this.openSnackBar('Successfully changed parameters');
        },
        error => {
          this.openSnackBar('Parameter change was not successful');
        });
    } else {
      this.openSnackBar('You are not authorized to change parameters');
    }
  }

  ngOnChanges() {
    this.chains = this.chainInfo.filter(element => element['accessability'] === 'private');
    this.connectedNodes = this.chains
      .map(element => element['target'])
      .reduce((x, y) => x && x.includes(y) ? x : [...x, y], []);
    if (this.selectedNode !== '') {
      this.updateChainSelection();
      if (this.selectedChain !== '') {
        this.updateConfiguration();
      }
    }
  }

}
