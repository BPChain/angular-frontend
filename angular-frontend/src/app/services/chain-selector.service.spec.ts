import { TestBed, inject } from '@angular/core/testing';

import { ChainSelectorService } from './chain-selector.service';

describe('ChainSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChainSelectorService]
    });
  });

  it('should be created', inject([ChainSelectorService], (service: ChainSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
