import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicChartsComponent } from './public-charts.component';

describe('PublicChartsComponent', () => {
  let component: PublicChartsComponent;
  let fixture: ComponentFixture<PublicChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicChartsComponent ]
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
