import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-scenario-bar',
  templateUrl: './scenario-bar.component.html',
  styleUrls: ['./scenario-bar.component.scss']
})
export class ScenarioBarComponent {

  @Input() isAuthenticated: boolean;
  private scenarios: Array<Object>;
  private selectedScenario: string;

  constructor(public snackBar: MatSnackBar) {
    this.scenarios = [
      {name: 'EVAPCoin', description: 'This is a description.'},
      {name: 'Scenario2', description: 'I like this coin.'},
      {name: 'Scenario3', description: 'I like this coin.'},
      {name: 'Scenario4', description: 'I like this coin.'},
      {name: 'Scenario5', description: 'I like this coin.'},
      {name: 'Scenario6', description: 'I like this coin.'},
      {name: 'Scenario7', description: 'I like this coin.'},
    ];
    this.selectedScenario = '';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  selectScenario(scenario) {
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
