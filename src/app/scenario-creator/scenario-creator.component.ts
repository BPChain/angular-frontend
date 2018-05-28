import { Component, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ScenarioUploadService } from '../services/scenario-upload.service';

@Component({
  selector: 'app-scenario-creator',
  templateUrl: './scenario-creator.component.html',
  styleUrls: ['./scenario-creator.component.scss']
})
export class ScenarioCreatorComponent {

  public scenarioName: string;
  public scenarioDescription: string;
  public scenarioNumberOfNodes: number;
  public transactionInterval: number;
  public payloadSize: number;

  constructor(
    private _scenarioUpload: ScenarioUploadService,
    private _snackBar: MatSnackBar,
  ) {
    this.transactionInterval = 10;
    this.payloadSize = 10;
    this.scenarioName = '';
    this.scenarioDescription = '';
    this.scenarioNumberOfNodes = 1;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  round(float: number) {
    return Math.round(float * 10) / 10;
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
        },
        error => {
          this.openSnackBar(`Error occured creating scenario: ${this.scenarioName}`);
          console.error(error);
        },
      );
    }
  }
}
