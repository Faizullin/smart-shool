import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectGroupAssignComponent } from './subject-group-assign.component';

describe('SubjectGroupAssignComponent', () => {
  let component: SubjectGroupAssignComponent;
  let fixture: ComponentFixture<SubjectGroupAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectGroupAssignComponent]
    });
    fixture = TestBed.createComponent(SubjectGroupAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
