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
  @Output() update: EventEmitter<any> = new EventEmitter();

  public connectedNodes: Array<string>;
  public chains: Array<object>;
  public selectedTarget: string;
  public selectedChain: string;
  public availableChains: Array<object>;
  public chainSelector: Array<string>;
  public configurationStore: object;
  public configuration: Array<object>;
  public chainIsActive: Boolean;
  public transactionInterval: number;
  public payloadSize: number;
  public scenarios: Array<object>;
  public selectedScenario: object;


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
    this.transactionInterval = 10;
    this.payloadSize = 10;
    this.selectedScenario = {
      name: 'No scenario',
      payloadSize: 1,
      period: 60,
    },

    this.scenarios = [
      {
        name: 'No scenario',
        payloadSize: 1,
        period: 60,
      },
      {
        name: 'Custom',
        description: 'Configure the scenario properties manually.',
        payloadSize: this.payloadSize,
        period: this.round(this.transactionInterval),
      },
      {
        name: 'EVAPCoin',
        description: `The EVAPCoin is the blockchain based solution
        to distribute and manage HPI-Sommerfest chips.
        During the Sommerfest we have many small transactions.`,
        period: 7,
        payloadSize: 8,
      },
      {
        name: 'OwnerChain',
        description: `The OwnerChain stores important information about properties.
        The property state changes infrequently but contains many data.`,
        period: 30,
        payloadSize: 700,
      },
      {
        name: 'Key distribution',
        description: `The key distribution service controlls the access rights to protected files.
        The assignment of permissions takes place not too often with an average key size.`,
        period: 20,
        payloadSize: 50
      },
    ];
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  round(float: number) {
    return Math.round(float * 10) / 10;
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
      return Object.assign(parameters, {[parameter['selector']]: 1});
    }, {});
    this.chainIsActive = selectedChainInfo['active'];
  }

  requestParameterChange() {
    if (this.isAuthenticated) {
      this._parameterConfigurator
        .setChainParameters({
          target: this.selectedTarget,
          chainName: this.selectedChain,
          parameters: Object.assign(
            this.configurationStore,
            {
              scenario: {
                name: this.selectedScenario['name'],
                period: this.transactionInterval,
                payloadSize: this.payloadSize,
              }
            },
          ),
        })
        .subscribe(result => {
          this.openSnackBar('Successfully changed parameters');
          this.update.emit(null);
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
        this.update.emit(null);
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
        this.update.emit(null);
        this.openSnackBar(`Successfully stopped ${this.selectedChain} on ${this.selectedTarget}`);
      },
      error => {
        this.openSnackBar(`Could not stop ${this.selectedChain} on ${this.selectedTarget}`);
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
