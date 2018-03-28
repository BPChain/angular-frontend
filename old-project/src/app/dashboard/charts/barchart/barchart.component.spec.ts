import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartComponent } from './barchart.component';
import {ChartsModule} from 'ng2-charts';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('BarchartComponent', () => {
  let component: BarchartComponent;
  let fixture: ComponentFixture<BarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartComponent ],
      imports: [ ChartsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
