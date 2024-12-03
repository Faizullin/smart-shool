import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterableMultiselectComponent } from './filterable-multiselect.component';

describe('FilterableMultiselectComponent', () => {
  let component: FilterableMultiselectComponent;
  let fixture: ComponentFixture<FilterableMultiselectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterableMultiselectComponent],
    });
    fixture = TestBed.createComponent(FilterableMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
