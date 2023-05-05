import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { MessageDialogComponent } from 'src/app/shared/dialogs/message-dialog/message-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error-handling/error-dialog/error-dialog.component';
import { CartData, CartItem } from '../../core';
import { Observable, Subscription } from 'rxjs';
import { AutoUnsubscribe } from '../../shared/utils/decorators';

@AutoUnsubscribe('getCartSubs')
@AutoUnsubscribe('orderSubs')
@AutoUnsubscribe('clearCartSubs')
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$!: Observable<CartItem[]>;
  totalCartQuantity$!: Observable<null | CartData>;
  private getCartSubs = new Subscription();
  private orderSubs = new Subscription();
  private clearCartSubs = new Subscription();

  constructor(private cartService: CartService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCartSubs.add(this.cartService.getCart().subscribe());
    this.getCart();
    this.getTotalQuantity();
  }

  getCart() {
    this.cart$ = this.cartService.cartContent;
  }

  getTotalQuantity() {
    this.totalCartQuantity$ = this.cartService.totalCartQuantity;
  }

  buyProducts() {
    this.orderSubs.add(
      this.cartService.orderFromCart().subscribe((res) => {
        if (res.status) {
          this.cartService.cartContent.next([]);
          this.cartService.totalCartQuantity.next(null);
          const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: res.message,
          });
          dialogRef.afterClosed();
        } else if (!res.status) {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: res.message,
            panelClass: 'color',
          });
          dialogRef.afterClosed();
        }
      })
    );
  }

  clearCart() {
    this.clearCartSubs.add(
      this.cartService.clearCart().subscribe((res) => {
        this.cartService.cartContent.next([]);
        this.cartService.totalCartQuantity.next(null);
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data: res.message,
        });
        dialogRef.afterClosed();
      })
    );
  }
}
