import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAnswerEditComponent } from './student-answer-edit.component';

describe('StudentAnswerEditComponent', () => {
  let component: StudentAnswerEditComponent;
  let fixture: ComponentFixture<StudentAnswerEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAnswerEditComponent],
    });
    fixture = TestBed.createComponent(StudentAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
