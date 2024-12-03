import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFileUploadComponent } from './edit-file-upload.component';

describe('EditFileUploadComponent', () => {
  let component: EditFileUploadComponent;
  let fixture: ComponentFixture<EditFileUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFileUploadComponent],
    });
    fixture = TestBed.createComponent(EditFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
