import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFileEditComponent } from './document-file-edit.component';

describe('DocumentFileEditComponent', () => {
  let component: DocumentFileEditComponent;
  let fixture: ComponentFixture<DocumentFileEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentFileEditComponent],
    });
    fixture = TestBed.createComponent(DocumentFileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
