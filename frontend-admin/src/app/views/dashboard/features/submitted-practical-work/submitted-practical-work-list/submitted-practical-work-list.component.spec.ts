import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedPracticalWorkListComponent } from './submitted-practical-work-list.component';

describe('SubmittedPracticalWorkListComponent', () => {
  let component: SubmittedPracticalWorkListComponent;
  let fixture: ComponentFixture<SubmittedPracticalWorkListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmittedPracticalWorkListComponent]
    });
    fixture = TestBed.createComponent(SubmittedPracticalWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
