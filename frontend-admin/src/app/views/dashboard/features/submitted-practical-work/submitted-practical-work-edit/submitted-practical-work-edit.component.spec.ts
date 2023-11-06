import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedPracticalWorkEditComponent } from './submitted-practical-work-edit.component';

describe('SubmittedPracticalWorkEditComponent', () => {
  let component: SubmittedPracticalWorkEditComponent;
  let fixture: ComponentFixture<SubmittedPracticalWorkEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmittedPracticalWorkEditComponent]
    });
    fixture = TestBed.createComponent(SubmittedPracticalWorkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
