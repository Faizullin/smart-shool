import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEditComponent } from './quiz-edit.component';

describe('QuizEditComponent', () => {
  let component: QuizEditComponent;
  let fixture: ComponentFixture<QuizEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizEditComponent],
    });
    fixture = TestBed.createComponent(QuizEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
