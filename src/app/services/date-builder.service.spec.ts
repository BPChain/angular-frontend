import { TestBed, inject } from '@angular/core/testing';

import { DateBuilderService } from './date-builder.service';

describe('DateBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateBuilderService]
    });
  });

  it('should be created', inject([DateBuilderService], (service: DateBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
