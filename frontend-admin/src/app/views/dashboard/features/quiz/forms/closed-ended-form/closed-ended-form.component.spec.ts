import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedEndedFormComponent } from './closed-ended-form.component';

describe('ClosedEndedFormComponent', () => {
  let component: ClosedEndedFormComponent;
  let fixture: ComponentFixture<ClosedEndedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosedEndedFormComponent]
    });
    fixture = TestBed.createComponent(ClosedEndedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
