import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductDetailsComponent } from './seller-product-details.component';

describe('SellerProductDetailsComponent', () => {
  let component: SellerProductDetailsComponent;
  let fixture: ComponentFixture<SellerProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
