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
  public chainSelector: Array<string>;
  public configuration: object;
  public chainIsActive: Boolean;

  constructor(
    private _parameterConfigurator: ParameterConfiguratorService,
    private _snackBar: MatSnackBar,
  ) {
    this.connectedNodes = [];
    this.selectedChain = '';
    this.selectedNode = '';
    this.availableChains = [];
    this.chainSelector = [];
    this.configuration = {
      numberOfHosts: 0,
      numberOfMiners: 0,
      initialDifficulty: 0,
      transactionsPerMin: 0,
    };
    this.chainIsActive = false;
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
    this.selectedChain = '';
  }

  updateConfiguration() {
    const selectedChainInfo = this.availableChains
      .find(element => element['chain'].toLowerCase() === this.selectedChain.toLowerCase());
    this.configuration = selectedChainInfo['parameters'];
    this.chainIsActive = selectedChainInfo['active'];
  }

  requestParameterChange() {
    if (this.isAuthenticated) {
      this._parameterConfigurator
        .setChainParameters({
          target: this.selectedNode,
          chain: this.selectedChain,
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

  startSelectedChain() {
    console.info(`Start ${this.selectedChain} on ${this.selectedNode}`);
  }

  stopSelectedChain() {
    console.info(`Stop ${this.selectedChain} on ${this.selectedNode}`);
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
