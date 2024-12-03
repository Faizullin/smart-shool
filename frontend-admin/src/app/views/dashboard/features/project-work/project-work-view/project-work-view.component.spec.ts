import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkViewComponent } from './project-work-view.component';

describe('ProjectWorkViewComponent', () => {
  let component: ProjectWorkViewComponent;
  let fixture: ComponentFixture<ProjectWorkViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectWorkViewComponent],
    });
    fixture = TestBed.createComponent(ProjectWorkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
