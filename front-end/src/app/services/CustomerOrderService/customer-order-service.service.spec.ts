import { TestBed } from '@angular/core/testing';

import { CustomerOrderServiceService } from './customer-order-service.service';

describe('CustomerOrderServiceService', () => {
  let service: CustomerOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
