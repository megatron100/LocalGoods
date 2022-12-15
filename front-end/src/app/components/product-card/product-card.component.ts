import {Component, Input, OnInit} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { IProduct } from '../../interfaces/product'
import {AddToCart} from "../../interfaces/addToCartModel";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {


  @Input() product: any;

  constructor( private cartService: CartService,
                private shopService: ShopService ) { }

  ngOnInit(): void {

  }

  onClickAdd(model:AddToCart) {

    this.cartService.addToCart(model)
        .subscribe(res => {
          console.log(res);
        })


  }


}
