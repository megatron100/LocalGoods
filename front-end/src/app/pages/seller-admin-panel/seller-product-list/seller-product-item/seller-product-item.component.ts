import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSellerProductDialogComponent } from '../dialogs/create-seller-product-dialog/create-seller-product-dialog.component';
import { Store } from '@ngrx/store';
import * as fromSellerProductList from '../../../../store';
import * as ProductActions from '../../../../store/seller-product.actions';
import { SellerService } from '../../../../services/seller.service';
import { SellerProductStorageService } from '../../../../services/seller-product-storage.service';
import { ErrorDialogComponent } from '../../../../shared/error-handling/error-dialog/error-dialog.component';
import { SellerProductItem } from '../../../../core/interfaces/responseDatas/SellerProductResponseData';

@Component({
  selector: 'app-seller-product-item',
  templateUrl: './seller-product-item.component.html',
  styleUrls: ['./seller-product-item.component.scss'],
})
export class SellerProductItemComponent {
  @Input() sellerProduct!: SellerProductItem;

  constructor(
    private dialog: MatDialog,
    public store: Store<fromSellerProductList.AppState>,
    public sellerService: SellerService,
    public sellerProductStorageService: SellerProductStorageService
  ) {}

  onProductDelete() {
    this.sellerProductStorageService
      .deleteProduct(this.sellerProduct.id.toString())
      .subscribe({
        next: (res: SellerProductItem[]) => {
          this.sellerService.setProducts(res);
        },
        error: (err) => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: err,
            panelClass: 'color',
          });
          dialogRef.afterClosed();
        },
      });
  }

  onProductUpdate() {
    this.store.dispatch(new ProductActions.ChangeMode(false));
    const dialogRef = this.dialog.open(CreateSellerProductDialogComponent, {
      data: this.sellerProduct,
    });
    dialogRef.afterClosed();
  }
}
