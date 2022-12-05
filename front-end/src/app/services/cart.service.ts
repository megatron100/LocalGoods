import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartContent: IProduct[] = [];

  addToCart(prod: IProduct) {
    this.cartContent.push(prod);
    console.log(this.cartContent);
    
  }

  constructor() { }
}
