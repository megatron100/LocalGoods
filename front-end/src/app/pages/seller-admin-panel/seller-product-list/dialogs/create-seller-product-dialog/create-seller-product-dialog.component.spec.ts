import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellerProductDialogComponent } from './create-seller-product-dialog.component';

describe('CreateSellerProductDialogComponent', () => {
  let component: CreateSellerProductDialogComponent;
  let fixture: ComponentFixture<CreateSellerProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSellerProductDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSellerProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
