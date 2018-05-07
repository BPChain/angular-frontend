import { TestBed, inject } from '@angular/core/testing';

import { ScenarioUploadService } from './scenario-upload.service';

describe('ScenarioUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScenarioUploadService]
    });
  });

  it('should be created', inject([ScenarioUploadService], (service: ScenarioUploadService) => {
    expect(service).toBeTruthy();
  }));
});
