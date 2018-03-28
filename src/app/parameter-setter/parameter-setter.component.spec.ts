import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterSetterComponent } from './parameter-setter.component';

describe('ParameterSetterComponent', () => {
  let component: ParameterSetterComponent;
  let fixture: ComponentFixture<ParameterSetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterSetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
