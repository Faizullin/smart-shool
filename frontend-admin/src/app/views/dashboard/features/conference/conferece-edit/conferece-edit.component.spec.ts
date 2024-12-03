import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfereceEditComponent } from './conferece-edit.component';

describe('ConfereceEditComponent', () => {
  let component: ConfereceEditComponent;
  let fixture: ComponentFixture<ConfereceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfereceEditComponent],
    });
    fixture = TestBed.createComponent(ConfereceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
