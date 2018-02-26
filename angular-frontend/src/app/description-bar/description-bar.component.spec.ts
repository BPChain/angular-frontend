import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionBarComponent } from './description-bar.component';

describe('DescriptionBarComponent', () => {
  let component: DescriptionBarComponent;
  let fixture: ComponentFixture<DescriptionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
