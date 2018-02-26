import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualizationBarComponent } from './data-visualization-bar.component';

describe('DataVisualizationBarComponent', () => {
  let component: DataVisualizationBarComponent;
  let fixture: ComponentFixture<DataVisualizationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataVisualizationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVisualizationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
