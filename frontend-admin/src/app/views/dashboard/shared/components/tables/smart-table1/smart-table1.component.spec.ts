import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTable1Component } from './smart-table1.component';

describe('SmartTable1Component', () => {
  let component: SmartTable1Component;
  let fixture: ComponentFixture<SmartTable1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartTable1Component],
    });
    fixture = TestBed.createComponent(SmartTable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
