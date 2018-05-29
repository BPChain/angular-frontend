import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyBarchartComponent } from './plotly-barchart.component';

describe('PlotlyBarchartComponent', () => {
  let component: PlotlyBarchartComponent;
  let fixture: ComponentFixture<PlotlyBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotlyBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotlyBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
