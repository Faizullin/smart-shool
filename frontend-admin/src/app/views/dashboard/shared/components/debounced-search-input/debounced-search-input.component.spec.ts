import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebouncedSearchInputComponent } from './debounced-search-input.component';

describe('DebouncedSearchInputComponent', () => {
  let component: DebouncedSearchInputComponent;
  let fixture: ComponentFixture<DebouncedSearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebouncedSearchInputComponent]
    });
    fixture = TestBed.createComponent(DebouncedSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
