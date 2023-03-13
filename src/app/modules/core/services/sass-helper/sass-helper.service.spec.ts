import { TestBed } from '@angular/core/testing';

import { SassHelperService } from './sass-helper.service';

describe('SassHelperService', () => {
  let service: SassHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SassHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
