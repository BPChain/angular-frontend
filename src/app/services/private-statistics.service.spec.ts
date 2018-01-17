import {async, TestBed} from '@angular/core/testing';

import { PrivateStatisticsService } from './private-statistics.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PrivateStatisticsService', () => {

  let service: PrivateStatisticsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrivateStatisticsService]
    });

    service = TestBed.get(PrivateStatisticsService);
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
  });

  it(`should return an Observable<PublicStatistics[]`, () => {
    const dummyStatistics = [
      {'_id': '5a5f18d840589c001e86ffeb',
        'chain': 'ethereum',
        'timeStamp': '2018-01-17T09:35:20.000Z',
        'numberOfHosts': 20,
        'numberOfMiners': 20,
        'avgHashrate': 31713.625,
        'avgBlocktime': 5.6375,
        'avgGasPrice': 18000000000,
        'avgDifficulty': 4373870.625,
        '__v': 0},
    ];

    service.get().subscribe(result => {
      expect(result).toEqual(dummyStatistics);
    });

    const req = httpMock.expectOne(`${service.url}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStatistics);
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
