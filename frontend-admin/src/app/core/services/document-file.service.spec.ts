import { TestBed } from '@angular/core/testing';

import { FileContentService } from './file-content.service';

describe('FileContentServiceService', () => {
  let service: FileContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
