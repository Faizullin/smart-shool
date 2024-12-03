import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkListComponent } from './project-work-list.component';

describe('ProjectWorkListComponent', () => {
  let component: ProjectWorkListComponent;
  let fixture: ComponentFixture<ProjectWorkListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectWorkListComponent],
    });
    fixture = TestBed.createComponent(ProjectWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
