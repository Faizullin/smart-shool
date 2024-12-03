import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAnswerListComponent } from './student-answer-list.component';

describe('StudentAnswerListComponent', () => {
  let component: StudentAnswerListComponent;
  let fixture: ComponentFixture<StudentAnswerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAnswerListComponent],
    });
    fixture = TestBed.createComponent(StudentAnswerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
