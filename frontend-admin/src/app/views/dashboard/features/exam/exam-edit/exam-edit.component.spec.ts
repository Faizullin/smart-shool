import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEditComponent } from './exam-edit.component';

describe('ExamEditComponent', () => {
  let component: ExamEditComponent;
  let fixture: ComponentFixture<ExamEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamEditComponent],
    });
    fixture = TestBed.createComponent(ExamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
