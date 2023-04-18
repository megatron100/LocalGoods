import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartResponseData, IProduct } from '../../../core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  quantity = '1';

  constructor(private cartService: CartService, public dialog: MatDialog) {}

  onProductAddToCart(prod: IProduct) {
    const product: AddToCartResponseData = {
      id: prod.id,
      quantity: +this.quantity,
    };
    this.cartService.addToCart(product).subscribe();
  }

  changeQuantity($event: Event) {
    this.quantity = ($event.target as HTMLInputElement).value;
  }
}
