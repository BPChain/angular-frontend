import { TestBed, inject } from '@angular/core/testing';

import { PrivateStatisticsService } from './private-statistics.service';
import {HttpClientModule} from "@angular/common/http";

describe('PrivateStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PrivateStatisticsService, HttpClientModule]
    });
  });

  it('should be created', inject([PrivateStatisticsService], (service: PrivateStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
