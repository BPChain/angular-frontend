import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateChartsComponent } from './private-charts.component';

describe('PrivateChartsComponent', () => {
  let component: PrivateChartsComponent;
  let fixture: ComponentFixture<PrivateChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateChartsComponent ]
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
