import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartComponent } from './linechart.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {DatePipe} from '@angular/common';

describe('LinechartComponent', () => {
  let component: LinechartComponent;
  let fixture: ComponentFixture<LinechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartComponent ],
      imports: [ChartsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DatePipe],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
