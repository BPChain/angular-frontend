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

  describe(`get()`, () => {

    it(`should issue a get request`, async(() => {
        service.get().subscribe();
        httpMock.expectOne({
          url: `${service.url}`,
          method: 'GET'
        });
      })
    );

    it(`should return an Observable<PublicStatistics[]`, () => {
      const dummyStatistics = [
        {
          '_id': '5a390f0be06d32001e7fb5d7',
          'avgBlocktime': 15.064466666666666,
          'avgHashrate': 21833916,
          'numberOfMiners': 65275,
          'numberOfWorkers': 178121,
          'timeToNextEpoch': 150192.73266666665,
          'timeStamp': 1513688843010,
          'chain': 'ethereum',
          '__v': 0
        },
      ];

      service.get().subscribe(result => {
        expect(result).toEqual(dummyStatistics);
      });

      const req = httpMock.expectOne(`${service.url}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyStatistics);
    });
  });

  describe(`query()`, () => {

    it(`should issue a query request`, async(() => {
        service.query('test').subscribe();
        httpMock.expectOne({
          url: `${service.url}?test`,
          method: 'GET'
        });
      })
    );

    it(`should issue a query request without a query`, async(() => {
        service.query().subscribe();
        httpMock.expectOne({
          url: `${service.url}`,
          method: 'GET'
        });
      })
    );

  });

});
