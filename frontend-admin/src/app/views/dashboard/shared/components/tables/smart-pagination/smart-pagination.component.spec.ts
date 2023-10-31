import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPaginationComponent } from './smart-pagination.component';

describe('SmartPaginationComponent', () => {
  let component: SmartPaginationComponent;
  let fixture: ComponentFixture<SmartPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartPaginationComponent],
    });
    fixture = TestBed.createComponent(SmartPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
