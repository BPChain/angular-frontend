import {Component, OnChanges, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ParameterConfiguratorService} from '../services/parameter-configurator.service';
import { MatSnackBar } from '@angular/material';
import {isUndefined} from "util";
import { ScenarioUploadService } from '../services/scenario-upload.service';

@Component({
  selector: 'app-parameter-setter',
  templateUrl: './parameter-setter.component.html',
  styleUrls: ['./parameter-setter.component.scss']
})

export class ParameterSetterComponent implements OnChanges, OnInit {


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
  public currentConfigStore: object;
  public configuration: Array<object>;
  public chainIsActive: Boolean;
  public transactionInterval: number;
  public payloadSize: number;
  public scenarios: Array<object>;
  public selectedScenario: object;
  public baseScenarios: Array<object>;
  public currentNumber: object;
  public scenarioName: string;
  public scenarioDescription: string;
  public scenarioNumberOfNodes: number;

  constructor(
    private _parameterConfigurator: ParameterConfiguratorService,
    private _scenarioUpload: ScenarioUploadService,
    private _snackBar: MatSnackBar,
  ) {
    this.connectedNodes = [];
    this.selectedChain = '';
    this.selectedTarget = '';
    this.availableChains = [];
    this.chainSelector = [];
    this.configurationStore = {};
    this.currentConfigStore = {};
    this.configuration = [];
    this.chainIsActive = false;
    this.transactionInterval = 10;
    this.payloadSize = 10;
    this.scenarioName = '',
    this.scenarioDescription = '',
    this.scenarioNumberOfNodes = 1,
    this.selectedScenario = {
      name: 'No scenario',
      payloadSize: 1,
      period: 60,
    },

    this.baseScenarios = [
      {
        logName: 'Create',
        description: 'Create a new scenario',
      },
      {
        logName: 'No scenario',
        description: 'Run the blockchain without a scenario',
      },
    ];

    this.scenarios = [];
  }



  updateScenarios() {
    this._scenarioUpload
    .getScenarios()
    .subscribe(
      result => {
        const newScenarios = this.baseScenarios.concat(result);
        if (JSON.stringify(this.scenarios) !== JSON.stringify(newScenarios)) {
          this.scenarios = newScenarios;
        }
      },
      error => {
        this.scenarios = this.baseScenarios;
        console.error(error);
      },
    );
  }

  ngOnInit(): void {

    this.updateScenarios();

    setInterval(
      () => {
        this.updateScenarios();
        this.update.emit(null);
      },
      5000
    );
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
    if (!this.chainSelector.includes(this.selectedChain)) {
      this.selectedChain = '';
    }
  }

  updateConfiguration() {
    const selectedChainInfo = this.availableChains
      .find(element => element['chainName'].toLowerCase() === this.selectedChain.toLowerCase());
    this.currentConfigStore = selectedChainInfo['state'];
    this.convertjson();
    this.configuration = selectedChainInfo['parameter'].filter(parameter => parameter['name']);
    this.chainIsActive = selectedChainInfo['active'];
    this.configurationStore = this.configuration.reduce((parameters, parameter) => {
      return Object.assign(parameters, {[parameter['selector']]: this.configurationStore[parameter['selector']]});
    }, {});

  }

  convertjson() {
    if (!isUndefined(this.currentConfigStore['miners'])) {
      this.currentConfigStore['numberOfMiners'] = this.currentConfigStore['miners'];
    }
    if (!isUndefined(this.currentConfigStore['hosts'])) {
      this.currentConfigStore['numberOfHosts'] = this.currentConfigStore['hosts'];
    }
  }

  createScenario() {
    if (this.scenarioName.length > 0 && this.scenarioDescription.length > 0) {
      this._scenarioUpload.createScenario({
        name: this.scenarioName,
        description: this.scenarioDescription,
        payloadSize: this.payloadSize,
        period: this.transactionInterval,
        numberOfNodes: this.scenarioNumberOfNodes,
      }).subscribe(
        result => {
          this.openSnackBar(`Created scenario: ${this.scenarioName}`);
          this.scenarioName = '';
          this.scenarioDescription = '';
          this.scenarioNumberOfNodes = 1;
          this.updateScenarios();
          this.selectedScenario = this.baseScenarios[1];
        },
        error => {
          this.openSnackBar(`Error occured creating scenario: ${this.scenarioName}`);
          console.error(error);
        },
      );
    }
  }

  requestParameterChange() {
    if (this.isAuthenticated) {
      const payload = this.selectedScenario['logName'] === 'No scenario'
        ? {}
        : {
          scenario: {
            name: this.selectedScenario['_id'],
          }
        };

      this._parameterConfigurator
        .setChainParameters({
          target: this.selectedTarget,
          chainName: this.selectedChain,
          parameters: Object.assign(
            this.configurationStore,
            payload,
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
