import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainRecorderComponent } from './chain-recorder.component';

describe('ChainRecorderComponent', () => {
  let component: ChainRecorderComponent;
  let fixture: ComponentFixture<ChainRecorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainRecorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
