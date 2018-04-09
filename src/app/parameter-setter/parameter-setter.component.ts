import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() requestUpdate: EventEmitter<boolean>;

  public connectedNodes: Array<string>;
  public chains: Array<object>;
  public selectedTarget: string;
  public selectedChain: string;
  public availableChains: Array<object>;
  public chainSelector: Array<string>;
  public configurationStore: object;
  public configuration: Array<object>;
  public chainIsActive: Boolean;


  constructor(
    private _parameterConfigurator: ParameterConfiguratorService,
    private _snackBar: MatSnackBar,
  ) {
    this.connectedNodes = [];
    this.selectedChain = '';
    this.selectedTarget = '';
    this.availableChains = [];
    this.chainSelector = [];
    this.configurationStore = {};
    this.configuration = [];
    this.chainIsActive = false;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  updateChainSelection() {
    this.availableChains = this.chains
        .filter(element => element['target'] === this.selectedTarget);
    this.chainSelector = this.availableChains.map(element => element['chainName']);
    this.selectedChain = '';
  }

  updateConfiguration() {
    const selectedChainInfo = this.availableChains
      .find(element => element['chainName'].toLowerCase() === this.selectedChain.toLowerCase());
    this.configuration = selectedChainInfo['parameter'].filter(parameter => parameter['name']);
    this.configurationStore = this.configuration.reduce((parameters, parameter) => {
      return Object.assign(parameters, {[parameter['selector']]: 0});
    }, {});
    this.chainIsActive = selectedChainInfo['active'];
  }

  requestParameterChange() {
    if (this.isAuthenticated) {
      this._parameterConfigurator
        .setChainParameters({
          target: this.selectedTarget,
          chainName: this.selectedChain,
          parameters: this.configurationStore,
        })
        .subscribe(result => {
          this.openSnackBar('Successfully changed parameters');
          // this.requestUpdate.emit();
        },
        error => {
          this.openSnackBar('Parameter change was not successful');
        });
    } else {
      this.openSnackBar('You are not authorized to change parameters');
    }
  }

  startSelectedChain() {
    this._parameterConfigurator
      .startChain(this.selectedChain, this.selectedTarget)
      .subscribe(result => {
        // this.requestUpdate.emit();
        this.openSnackBar(`Successfully started ${this.selectedChain} on ${this.selectedTarget}`);
      },
      error => {
        this.openSnackBar(`Could not start ${this.selectedChain} on ${this.selectedTarget}`);
      });
  }

  stopSelectedChain() {
    this._parameterConfigurator
      .stopChain(this.selectedChain, this.selectedTarget)
      .subscribe(result => {
        // this.requestUpdate.emit();
        this.openSnackBar(`Successfully started ${this.selectedChain} on ${this.selectedTarget}`);
      },
      error => {
        this.openSnackBar(`Could not start ${this.selectedChain} on ${this.selectedTarget}`);
      });
  }

  ngOnChanges() {
    this.chains = this.chainInfo.filter(element => element['accessability'] === 'private');
    this.connectedNodes = this.chains
      .map(element => element['target'])
      .reduce((x, y) => x && x.includes(y) ? x : [...x, y], []);
    if (this.selectedTarget !== '') {
      this.updateChainSelection();
      if (this.selectedChain !== '') {
        this.updateConfiguration();
      }
    }
  }

}
