import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioBarComponent } from './scenario-bar.component';

describe('ScenarioBarComponent', () => {
  let component: ScenarioBarComponent;
  let fixture: ComponentFixture<ScenarioBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
