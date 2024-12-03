import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultStatsComponent } from './result-stats.component';

describe('ResultStatsComponent', () => {
  let component: ResultStatsComponent;
  let fixture: ComponentFixture<ResultStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultStatsComponent],
    });
    fixture = TestBed.createComponent(ResultStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
