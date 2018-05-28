import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ScenarioUploadService } from '../services/scenario-upload.service';

@Component({
  selector: 'app-scenario-selector',
  templateUrl: './scenario-selector.component.html',
  styleUrls: ['./scenario-selector.component.scss']
})
export class ScenarioSelectorComponent implements OnInit, OnDestroy {

  @Output() select: EventEmitter<any> = new EventEmitter ();

  public scenarios: Array<object>;
  public selectedScenario: object;
  public baseScenarios: Array<object>;
  private interval: any;

  constructor(private _scenarioUpload: ScenarioUploadService) {
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

    this.select.emit(this.selectedScenario);
  }

  updateScenarios () {
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

}
