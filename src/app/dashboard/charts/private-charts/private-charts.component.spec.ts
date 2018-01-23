import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateChartsComponent } from './private-charts.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('PrivateChartsComponent', () => {
  let component: PrivateChartsComponent;
  let fixture: ComponentFixture<PrivateChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateChartsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
