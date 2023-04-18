import { Component, Input, OnInit } from '@angular/core';
import { AddToCartResponseData, CartItem } from '../../../core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: CartItem;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('');
  }

  removeItem(id: number) {
    this.cartService.removeItemFromCart(id);
    this.cartService.calcOrderData();
    this.cartService.removeItem(id).subscribe();
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
    this.cartService.addToCart(model).subscribe();
  }

  onDecrease(id: number) {
    const newQuantity = --this.cartItem.quantity;
    this.cartService.calcOrderData();
    const newAmount = newQuantity * this.cartItem.product.price;
    this.cartService.changeQuantity(id, newQuantity, newAmount);
    this.cartService.decreaseQuantity(id).subscribe();
  }
}
