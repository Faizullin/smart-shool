import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabworkEditComponent } from './labwork-edit.component';

describe('LabworkEditComponent', () => {
  let component: LabworkEditComponent;
  let fixture: ComponentFixture<LabworkEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabworkEditComponent],
    });
    fixture = TestBed.createComponent(LabworkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
