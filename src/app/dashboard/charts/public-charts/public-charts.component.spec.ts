import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicChartsComponent } from './public-charts.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('PublicChartsComponent', () => {
  let component: PublicChartsComponent;
  let fixture: ComponentFixture<PublicChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicChartsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
