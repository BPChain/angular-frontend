import { TestBed, inject } from '@angular/core/testing';

import { PrivateStatsService } from './private-stats.service';

describe('PrivateStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivateStatsService]
    });
  });

  it('should be created', inject([PrivateStatsService], (service: PrivateStatsService) => {
    expect(service).toBeTruthy();
  }));
});
