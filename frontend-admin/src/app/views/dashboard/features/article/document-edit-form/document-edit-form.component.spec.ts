import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditFormComponent } from './document-edit-form.component';

describe('DocumentEditFormComponent', () => {
  let component: DocumentEditFormComponent;
  let fixture: ComponentFixture<DocumentEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentEditFormComponent],
    });
    fixture = TestBed.createComponent(DocumentEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
