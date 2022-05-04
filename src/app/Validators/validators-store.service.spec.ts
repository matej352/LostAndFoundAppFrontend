import { TestBed } from '@angular/core/testing';

import { ValidatorsStoreService } from './validators-store.service';

describe('ValidatorsStoreService', () => {
  let service: ValidatorsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
