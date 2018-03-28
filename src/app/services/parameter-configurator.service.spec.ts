import { TestBed, inject } from '@angular/core/testing';

import { ParameterConfiguratorService } from './parameter-configurator.service';

describe('ParameterConfiguratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParameterConfiguratorService]
    });
  });

  it('should be created', inject([ParameterConfiguratorService], (service: ParameterConfiguratorService) => {
    expect(service).toBeTruthy();
  }));
});
