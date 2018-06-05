import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioCreatorComponent } from './scenario-creator.component';

describe('ScenarioCreatorComponent', () => {
  let component: ScenarioCreatorComponent;
  let fixture: ComponentFixture<ScenarioCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
