import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTrainFaceImageEditComponent } from './student-train-face-image-edit.component';

describe('StudentTrainFaceImageEditComponent', () => {
  let component: StudentTrainFaceImageEditComponent;
  let fixture: ComponentFixture<StudentTrainFaceImageEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentTrainFaceImageEditComponent],
    });
    fixture = TestBed.createComponent(StudentTrainFaceImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
