import { Component, Input } from '@angular/core';
import { AddToCartResponseData, CartItem } from '../../../core';
import { CartService } from '../../../services/cart.service';
import { AutoUnsubscribe } from '../../../shared/utils/decorators';
import { Subscription } from 'rxjs';

@AutoUnsubscribe('removeItemSubs')
@AutoUnsubscribe('addToCartSubs')
@AutoUnsubscribe('decreaseQuantitySubs')
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  private removeItemSubs = new Subscription();
  private addToCartSubs = new Subscription();
  private decreaseQuantitySubs = new Subscription();

  constructor(private cartService: CartService) {}

  removeItem(id: number) {
    this.cartService.removeItemFromCart(id);
    this.cartService.calcOrderData();
    this.removeItemSubs.add(this.cartService.removeItem(id).subscribe());
  }

  onIncrease(id: number) {
    const newQuantity = ++this.cartItem.quantity;
    this.cartService.calcOrderData();
    const newAmount = newQuantity * this.cartItem.product.price;
    this.cartService.changeQuantity(id, newQuantity, newAmount);
    const model: AddToCartResponseData = {
      id: id,
      quantity: 1,
    };
    this.addToCartSubs.add(this.cartService.addToCart(model).subscribe());
  }

  onDecrease(id: number) {
    const newQuantity = --this.cartItem.quantity;
    this.cartService.calcOrderData();
    const newAmount = newQuantity * this.cartItem.product.price;
    this.cartService.changeQuantity(id, newQuantity, newAmount);
    this.decreaseQuantitySubs.add(
      this.cartService.decreaseQuantity(id).subscribe()
    );
  }
}
