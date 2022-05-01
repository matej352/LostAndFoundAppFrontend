import { TestBed } from '@angular/core/testing';

import { CheckIfLoggedInService } from './check-if-logged-in.service';

describe('CheckIfLoggedInService', () => {
  let service: CheckIfLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckIfLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
