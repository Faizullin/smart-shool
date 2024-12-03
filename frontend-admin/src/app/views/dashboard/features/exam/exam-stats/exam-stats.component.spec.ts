import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStatsComponent } from './exam-stats.component';

describe('ExamStatsComponent', () => {
  let component: ExamStatsComponent;
  let fixture: ComponentFixture<ExamStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamStatsComponent],
    });
    fixture = TestBed.createComponent(ExamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
