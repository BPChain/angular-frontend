import { TestBed, inject } from '@angular/core/testing';

import { UserAuthenticationService } from './user-authentication.service';

describe('UserAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthenticationService]
    });
  });

  it('should be created', inject([UserAuthenticationService], (service: UserAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
