import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnswerListComponent } from './user-answer-list.component';

describe('UserAnswerListComponent', () => {
  let component: UserAnswerListComponent;
  let fixture: ComponentFixture<UserAnswerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAnswerListComponent],
    });
    fixture = TestBed.createComponent(UserAnswerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
