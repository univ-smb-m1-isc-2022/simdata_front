import { TestBed } from '@angular/core/testing';

import { SassHelperService } from './sass-helper.service';

describe('SassHelperService', () => {
  let service: SassHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SassHelperService);
    //add a test property
    document.documentElement.style.setProperty('--color-test', '#000000');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a string', () => {
    expect(typeof service.readProperty('--color-1')).toBe('string');
  });

  it('should return #000000', () => {
    expect(service.readProperty('--color-test')).toBe('#000000');
  });
});
