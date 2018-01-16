import { TestBed, inject } from '@angular/core/testing';

import { PublicStatisticsService } from './public-statistics.service';
import {HttpClientModule} from '@angular/common/http';

describe('PublicStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClientModule, PublicStatisticsService]
    });
  });

  it('should be created', inject([PublicStatisticsService], (service: PublicStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
