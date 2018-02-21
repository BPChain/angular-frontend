import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressumComponent } from './impressum.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('ImpressumComponent', () => {
  let component: ImpressumComponent;
  let fixture: ComponentFixture<ImpressumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressumComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
