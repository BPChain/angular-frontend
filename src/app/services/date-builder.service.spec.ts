import { TestBed, inject } from '@angular/core/testing';

import { DateBuilderService } from './date-builder.service';

let testService;

describe('DateBuilderService', () => {
  beforeEach(() => {
    testService = new DateBuilderService();
    TestBed.configureTestingModule({
      providers: [DateBuilderService]
    });
  });

  it('should be created', inject([DateBuilderService], (service: DateBuilderService) => {
    expect(service).toBeTruthy();
  }));

  describe('convertDate()', () => {

    it('should set hours', () => {
      const date = new Date('October 13, 2014 11:13:00');
      const modifiedDate = new Date('October 13, 2014 10:13:00');
      expect(testService.convertDate(date, 10, null)).toEqual(modifiedDate);
    });

    it('should set minutes', () => {
      const date = new Date('October 13, 2014 11:13:00');
      const modifiedDate = new Date('October 13, 2014 11:10:00');
      expect(testService.convertDate(date, null, 10)).toEqual(modifiedDate);
    });

    it('should set hours and minutes', () => {
      const date = new Date('October 13, 2014 11:13:00');
      const modifiedDate = new Date('October 13, 2014 10:10:00');
      expect(testService.convertDate(date, 10, 10)).toEqual(modifiedDate);
    });

    it('should not set hours and minutes', () => {
      const date = new Date('October 13, 2014 11:13:00');
      expect(testService.convertDate(date, null, null)).toEqual(date);
    });
  });

});
