import { TestBed } from '@angular/core/testing';

import { IsCompanyService } from './is-company.service';

describe('IsCompanyService', () => {
  let service: IsCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
