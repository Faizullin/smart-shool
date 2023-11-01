import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTrainFaceImageListComponent } from './student-train-face-image-list.component';

describe('StudentTrainFaceImageListComponent', () => {
  let component: StudentTrainFaceImageListComponent;
  let fixture: ComponentFixture<StudentTrainFaceImageListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentTrainFaceImageListComponent]
    });
    fixture = TestBed.createComponent(StudentTrainFaceImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
