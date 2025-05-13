import { TestBed } from '@angular/core/testing';

import { CegErtekelesServiceService } from './ceg-ertekeles-service.service';

describe('CegErtekelesServiceService', () => {
  let service: CegErtekelesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CegErtekelesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
