import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cart!: any[];

  constructor( private cartService: CartService ) { }

  ngOnInit(): void {
    this.getCart();
    
  }

  getCart() {
    this.cartService.getCart()
        .subscribe(res => {
          this.cart = res.data.cartItems;
          console.log(this.cart);
          
          
        })
  }

  calculatePrice(arr: any[]): number {
    let sum: number = 0;
    for (let item of arr) {
      sum += (item.product.price * item.quantity);      
    }

    return sum;
  }
}
