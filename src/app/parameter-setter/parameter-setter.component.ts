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
    this.selectedScenario = {};

    this.scenarios = [
      {name: 'No scenario'},
      {name: 'Custom', description: 'Configure the scenario properties manually.'},
      {name: 'EVAPCoin', description: 'This is a description.'},
      {name: 'OwnerChain', description: `Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Integer id dui sodales,
        vestibulum eros vel, vestibulum ante. Praesent ornare lorem posuere,
        dapibus erat eu, commodo nisi. Mauris tempus ultrices feugiat.`},
      {name: 'MediXAIN', description: 'This is a description.'},
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
      return Object.assign(parameters, {[parameter['selector']]: 0});
    }, {});
    this.chainIsActive = selectedChainInfo['active'];
  }

  dispatchScenario(scenarioName: string): object {
    switch (scenarioName) {
      case 'EVAPCoin':
        return {
          name: 'EVAPCoin',
          period: 20,
          payloadSize: 50,
        };
      case 'MediXAIN':
        return {
          name: 'MediXAIN',
          period: 20,
          payloadSize: 700,
        };
      case 'OwnerChain':
        return {
          name: 'OwnerChain',
          period: 5,
          payloadSize: 70,
        };
      default:
        return {
          name: 'No scenario',
          payloadSize: 1,
          period: 60,
        };
    }
  }

  getScenarioConfiguration(): object {
    if (this.selectedScenario['name'] === 'Custom') {
      return {
        name: 'Custom',
        payloadSize: this.payloadSize,
        period: this.transactionInterval,
      };
    } else if (this.selectedScenario['name'] === 'No scenario') {
      return {
        name: 'No scenario',
        payloadSize: 1,
        period: 60,
      };
    } else {
      return this.dispatchScenario(this.selectedScenario['name']);
    }
  }

  requestParameterChange() {
    const scenario = this.getScenarioConfiguration();
    console.info(scenario)
    if (this.isAuthenticated) {
      this._parameterConfigurator
        .setChainParameters({
          target: this.selectedTarget,
          chainName: this.selectedChain,
          parameters: Object.assign(
            this.configurationStore,
            {scenario},
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
