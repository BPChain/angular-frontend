import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  Input,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { ScenarioConfiguratorService } from '../services/scenario-configurator.service';

@Component({
  selector: 'app-scenario-selector',
  templateUrl: './scenario-selector.component.html',
  styleUrls: ['./scenario-selector.component.scss']
})
export class ScenarioSelectorComponent implements OnInit, OnDestroy, OnChanges {

  @Output() select: EventEmitter<any> = new EventEmitter ();
  @Input() current: object;

  public currentScenario: object;
  public scenarios: Array<object>;
  public selectedScenario: object;
  public baseScenarios: Array<object>;
  private interval: any;

  constructor(private _scenarioConfigurator: ScenarioConfiguratorService) {
    this.scenarios = [];
    this.selectedScenario = {
      id: '1',
      logName: 'No scenario',
      description: 'Run the blockchain without a scenario',
      logContent: {},
      timestamp: (new Date()).toISOString(),
    };
    this.baseScenarios = [
      {
        id: '0',
        logName: 'Create',
        description: 'Create a new scenario',
        logContent: {},
        timestamp: (new Date()).toISOString(),
      },
      {
        id: '1',
        logName: 'No scenario',
        description: 'Run the blockchain without a scenario',
        logContent: {},
        timestamp: (new Date()).toISOString(),
      },
    ];
    this.currentScenario = {logName: 'No scenario', description: ''};

    this.select.emit(this.selectedScenario);
  }

  updateScenarios () {
    this._scenarioConfigurator
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

  selectScenario () {
    this.select.emit(this.selectedScenario);
  }

  ngOnInit(): void {
    this.updateScenarios();
    this.interval = setInterval(
      () => {
        this.updateScenarios();
      },
      5000
    );
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngOnChanges() {
    if (this.current['name']) {
      this._scenarioConfigurator
      .getScenario(this.current['name'])
      .subscribe(result => {
        this.currentScenario = result;
      },
      error => {
        this.currentScenario = {logName: 'No scenario', description: ''};
        console.warn('Could not load scenario ' + this.current['name']);
      });
    } else {
      this.currentScenario = {logName: 'No scenario', description: ''};
    }
  }

}
