import { TestBed, inject } from '@angular/core/testing';

import { ScenarioConfiguratorService } from './scenario-configurator.service';

describe('ScenarioConfiguratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScenarioConfiguratorService]
    });
  });

  it('should be created', inject([ScenarioConfiguratorService], (service: ScenarioConfiguratorService) => {
    expect(service).toBeTruthy();
  }));
});
