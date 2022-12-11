import {Component, Input, OnInit} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from '../../interfaces/product'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {


  @Input() product: any;

  constructor( private cartService: CartService ) { }

  ngOnInit(): void {
    
  }

  onClickAdd(prod: IProduct) {

    this.cartService.addToCart(prod);
    console.log(prod);
    

  }
}
