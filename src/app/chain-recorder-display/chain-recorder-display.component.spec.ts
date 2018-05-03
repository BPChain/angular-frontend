import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainRecorderDisplayComponent } from './chain-recorder-display.component';

describe('ChainRecorderDisplayComponent', () => {
  let component: ChainRecorderDisplayComponent;
  let fixture: ComponentFixture<ChainRecorderDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainRecorderDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainRecorderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
