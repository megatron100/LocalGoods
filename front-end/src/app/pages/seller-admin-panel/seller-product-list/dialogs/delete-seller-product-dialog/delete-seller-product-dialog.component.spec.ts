import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSellerProductDialogComponent } from './delete-seller-product-dialog.component';

describe('DeleteSellerProductDialogComponent', () => {
  let component: DeleteSellerProductDialogComponent;
  let fixture: ComponentFixture<DeleteSellerProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSellerProductDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSellerProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
