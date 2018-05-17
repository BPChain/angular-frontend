import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-scenario-bar',
  templateUrl: './scenario-bar.component.html',
  styleUrls: ['./scenario-bar.component.scss']
})
export class ScenarioBarComponent {

  @Input() isAuthenticated: boolean;
  public selectedScenario: string;
  public transactionFrequency: number;
  public payloadSize: number;

  constructor(public snackBar: MatSnackBar) {
    this.transactionFrequency = 0;
    this.payloadSize = 0;
    this.selectedScenario = '';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  round(float: number) {
    return Math.round(float * 10) / 10;
  }

  updateScenario(scenario) {
    if (this.isAuthenticated) {
      if (this.selectedScenario === scenario) {
        this.selectedScenario = '';
        this.openSnackBar(`Successfully stopped scenario: ${scenario}`);
      } else {
        this.selectedScenario = scenario;
        this.openSnackBar(`Successfully started scenario: ${scenario}`);
      }
    } else {
      this.openSnackBar('You are not authorized');
    }
  }
}
