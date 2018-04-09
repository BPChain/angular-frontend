import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsVisualizationComponent } from './metrics-visualization.component';

describe('MetricsVisualizationComponent', () => {
  let component: MetricsVisualizationComponent;
  let fixture: ComponentFixture<MetricsVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
