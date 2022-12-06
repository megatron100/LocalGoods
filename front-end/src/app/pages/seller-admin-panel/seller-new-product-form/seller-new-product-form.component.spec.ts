import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerNewProductFormComponent } from './seller-new-product-form.component';

describe('SellerNewProductFormComponent', () => {
  let component: SellerNewProductFormComponent;
  let fixture: ComponentFixture<SellerNewProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerNewProductFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerNewProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
