import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableFormComponent } from './draggable-form.component';

describe('DraggableFormComponent', () => {
  let component: DraggableFormComponent;
  let fixture: ComponentFixture<DraggableFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableFormComponent],
    });
    fixture = TestBed.createComponent(DraggableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
