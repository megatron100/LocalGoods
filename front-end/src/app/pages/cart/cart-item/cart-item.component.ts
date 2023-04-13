import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() product!: IProduct;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('');
  }
}
