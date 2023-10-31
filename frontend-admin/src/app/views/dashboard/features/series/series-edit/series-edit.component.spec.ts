import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesEditComponent } from './series-edit.component';

describe('SeriesEditComponent', () => {
  let component: SeriesEditComponent;
  let fixture: ComponentFixture<SeriesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesEditComponent]
    });
    fixture = TestBed.createComponent(SeriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
