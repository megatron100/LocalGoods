import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductStartComponent } from './seller-product-start.component';

describe('SellerProductStartComponent', () => {
  let component: SellerProductStartComponent;
  let fixture: ComponentFixture<SellerProductStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerProductStartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerProductStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
