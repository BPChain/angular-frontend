import { TestBed, inject } from '@angular/core/testing';

import { RecordingHandlerService } from './recording-handler.service';

describe('RecordingHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordingHandlerService]
    });
  });

  it('should be created', inject([RecordingHandlerService], (service: RecordingHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
