import { TestBed } from '@angular/core/testing';

import { MxvxDbService } from './mxvx-db.service';

describe('MxvxDbService', () => {
  let service: MxvxDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MxvxDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
