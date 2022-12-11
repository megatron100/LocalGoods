import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() product: any;

  cart!: IProduct[];

  constructor( private cartService: CartService ) { }

  ngOnInit(): void {
    this.cart = this.cartService.cartContent;
  }

}
