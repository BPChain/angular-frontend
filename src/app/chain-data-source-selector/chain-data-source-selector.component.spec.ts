import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainDataSourceSelectorComponent } from './chain-data-source-selector.component';

describe('ChainDataSourceSelectorComponent', () => {
  let component: ChainDataSourceSelectorComponent;
  let fixture: ComponentFixture<ChainDataSourceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainDataSourceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainDataSourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
