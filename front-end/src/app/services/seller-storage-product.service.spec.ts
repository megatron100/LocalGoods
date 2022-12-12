import { TestBed } from '@angular/core/testing';

import { SellerProductStorageService } from './seller-product-storage.service';

describe('SellerService', () => {
  let service: SellerProductStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerProductStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
