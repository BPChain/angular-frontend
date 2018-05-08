import { TestBed, inject } from '@angular/core/testing';

import { RecordingService } from './recording.service';

describe('RecordingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordingService]
    });
  });

  it('should be created', inject([RecordingService], (service: RecordingService) => {
    expect(service).toBeTruthy();
  }));
});
