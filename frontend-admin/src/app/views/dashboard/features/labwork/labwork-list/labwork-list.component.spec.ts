import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabworkListComponent } from './labwork-list.component';

describe('LabworkListComponent', () => {
  let component: LabworkListComponent;
  let fixture: ComponentFixture<LabworkListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabworkListComponent],
    });
    fixture = TestBed.createComponent(LabworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
