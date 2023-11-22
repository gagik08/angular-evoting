import { TestBed } from '@angular/core/testing';

import { ReferendumService } from './referendum.service';

describe('ReferendumService', () => {
  let service: ReferendumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferendumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
