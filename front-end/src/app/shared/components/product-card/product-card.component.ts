import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/shared/dialogs/message-dialog/message-dialog.component';
import { AddToCart, IProduct } from '../../../core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  constructor(private cartService: CartService, public dialog: MatDialog) {}

  onClickAdd(model: AddToCart) {
    this.cartService.addToCart(model).subscribe((res) => {
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: res.message,
      });
      dialogRef.afterClosed();
    });
  }
}
