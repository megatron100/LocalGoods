import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductItemComponent } from './seller-product-item.component';

describe('SellerProductItemComponent', () => {
  let component: SellerProductItemComponent;
  let fixture: ComponentFixture<SellerProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerProductItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
