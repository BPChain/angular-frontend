import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyLinechartComponent } from './plotly-linechart.component';

describe('PlotlyLinechartComponent', () => {
  let component: PlotlyLinechartComponent;
  let fixture: ComponentFixture<PlotlyLinechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotlyLinechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotlyLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
