import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEditComponent } from './notification-edit.component';

describe('NotificationEditComponent', () => {
  let component: NotificationEditComponent;
  let fixture: ComponentFixture<NotificationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationEditComponent],
    });
    fixture = TestBed.createComponent(NotificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
