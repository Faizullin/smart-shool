import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEditComponent } from './subject-edit.component';

describe('SubjectEditComponent', () => {
  let component: SubjectEditComponent;
  let fixture: ComponentFixture<SubjectEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectEditComponent],
    });
    fixture = TestBed.createComponent(SubjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
