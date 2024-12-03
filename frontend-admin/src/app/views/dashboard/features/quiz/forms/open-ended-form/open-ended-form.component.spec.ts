import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEndedFormComponent } from './open-ended-form.component';

describe('OpenEndedFormComponent', () => {
  let component: OpenEndedFormComponent;
  let fixture: ComponentFixture<OpenEndedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenEndedFormComponent],
    });
    fixture = TestBed.createComponent(OpenEndedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
