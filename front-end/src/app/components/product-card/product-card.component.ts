import {Component, Input, OnInit} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {


  @Input() product: any;

  constructor( private cartService: CartService) { }

  ngOnInit(): void {

  }

  onClickAdd(id: number) {

    this.cartService.addToCart(id)
        .subscribe(res => {
          console.log(res);
        })


  }


}
