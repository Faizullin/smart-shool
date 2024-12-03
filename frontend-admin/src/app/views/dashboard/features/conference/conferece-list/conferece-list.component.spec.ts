import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfereceListComponent } from './conferece-list.component';

describe('ConfereceListComponent', () => {
  let component: ConfereceListComponent;
  let fixture: ComponentFixture<ConfereceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfereceListComponent],
    });
    fixture = TestBed.createComponent(ConfereceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
