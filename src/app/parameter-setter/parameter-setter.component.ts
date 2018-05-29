import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {isUndefined} from 'util';
import { MatSnackBar } from '@angular/material';
import {ParameterConfiguratorService} from '../services/parameter-configurator.service';


@Component({
  selector: 'app-parameter-setter',
  templateUrl: './parameter-setter.component.html',
  styleUrls: ['./parameter-setter.component.scss']
})

export class ParameterSetterComponent implements OnChanges, OnInit, OnDestroy {


  @Input() chainInfo: Array<object>;
  @Input() isAuthenticated: Boolean;
  @Output() update: EventEmitter<any> = new EventEmitter();

  public connectedNodes: Array<string>;
  public availableChains: Array<object>;
  public chains: Array<object>;
  public selectedTarget: string;
  public selectedChain: string;
  public selectedScenario: object;
  public configuration: Array<object>;
  public configurationStore: object;
  public currentConfigStore: object;
  public chainSelector: Array<string>;
  public chainIsActive: Boolean;
  public chainIsStarting: boolean;
  public chainIsStopping: boolean;
  public startChainPipeline: Array<object>;
  public stopChainPipeline: Array<object>;
  private interval: any;


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
    this.currentConfigStore = {};
    this.configuration = [];
    this.selectedScenario = {};
    this.startChainPipeline = [];
    this.stopChainPipeline = [];
    this.chainIsActive = false;
    this.chainIsStarting = false;
    this.chainIsStopping = false;

  }

  ngOnInit(): void {
    this.interval = setInterval(
      () => {
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

  selectScenario (scenario: object): void {
    this.selectedScenario = scenario;
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
    this.chainIsStarting = this.checkChainProgress(this.startChainPipeline, this.selectedChain, this.selectedTarget);
    this.chainIsStopping = this.checkChainProgress(this.stopChainPipeline, this.selectedChain, this.selectedTarget);
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
        this.startChainPipeline.push({chain: this.selectedChain, target: this.selectedTarget});
        this.chainIsStarting = true;
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
        this.stopChainPipeline.push({chain: this.selectedChain, target: this.selectedTarget});
        this.chainIsStopping = true;
        this.openSnackBar(`Successfully stopped ${this.selectedChain} on ${this.selectedTarget}`);
      },
      error => {
        this.openSnackBar(`Could not stop ${this.selectedChain} on ${this.selectedTarget}`);
      });
  }

  checkChainProgress(queue: Array<object>, chain: string, target: string): boolean {
    if (chain && target) {
      if (queue
        .find(element => element['chain'] === chain && element['target'] === target)) {
        return true;
      } else {
        return false;
      }
    }
  }

  checkActiveChains(queue: Array<object>, chains: Array<object>, reverse = false): Array<object> {
    return queue.filter(chain => {
      const chainInfo = chains
        .filter(element => element['target'] === chain['target'])
        .find(element => element['chainName'].toLowerCase() === chain['chain'].toLowerCase());
      return reverse !== !chainInfo['active'];
    });
  }


  ngOnChanges() {
    this.chains = this.chainInfo.filter(element => element['accessability'] === 'private');
    this.startChainPipeline = this.checkActiveChains(this.startChainPipeline, this.chains);
    this.stopChainPipeline = this.checkActiveChains(this.stopChainPipeline, this.chains, true);
    this.chainIsStarting = this.checkChainProgress(this.startChainPipeline, this.selectedChain, this.selectedTarget);
    this.chainIsStopping = this.checkChainProgress(this.startChainPipeline, this.selectedChain, this.selectedTarget);
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

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
