import {TestBed, inject, async} from '@angular/core/testing';

import { PublicStatisticsService } from './public-statistics.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PublicStatisticsService', () => {

  let service: PublicStatisticsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublicStatisticsService]
    });

    service = TestBed.get(PublicStatisticsService);
    httpMock = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {

    it(`should issue a get request`, async(() => {
        service.get().subscribe();
        httpMock.expectOne({
          url: '',
          method: 'GET'
        });
      })
    );

    it(`should respond with fake data`, async() => {
      service.get().subscribe((next) => {
        expect(next).toEqual({ baz: '123' });
      });

      httpMock.match({
        url: '',
        method: 'GET'
      })[0].flush({ baz: '123' });
    });
  });

});
