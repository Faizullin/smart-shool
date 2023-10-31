import { TestBed } from '@angular/core/testing';

import { LabworkService } from './labwork.service';

describe('LabworkService', () => {
  let service: LabworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
