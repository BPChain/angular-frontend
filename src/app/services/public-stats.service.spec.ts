import { TestBed, inject } from '@angular/core/testing';

import { PublicStatsService } from './public-stats.service';

describe('PublicStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicStatsService]
    });
  });

  it('should be created', inject([PublicStatsService], (service: PublicStatsService) => {
    expect(service).toBeTruthy();
  }));
});
