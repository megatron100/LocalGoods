import { Injectable } from '@angular/core';
import {IProduct} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  products: IProduct[] = [
    {
      name: 'Cheese',
      photo: '/assets/images/shutterstock_133908008-1.jpg',
      price: 23.5,
      description: 'Gouda Cheese – Nutrition, Health Benefits, and Side Effects',
      seller: 'seller 1'
    },
    {
      name: 'Salad',
      photo: '/assets/images/gen-lettuce.jpeg',
      price: 7.54,
      description: 'Leaf lettuce is a loose-leaf mild-flavored, leaf vegetable commonly used in salads and sandwiches',
      seller: 'seller 2'
    },
    {
      name: 'Milk',
      photo: '/assets/images/depositphotos_118507928-stock-photo-glass-jug-with-milk-and.jpg',
      price: 9.24,
      description: 'Glass jug with milk and a glass on the nature',
      seller: 'seller 2'
    },
  ]

  constructor() { }
}
