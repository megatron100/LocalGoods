import { Component, OnInit } from '@angular/core';
import { AddToCart } from 'src/app/interfaces/addToCartModel';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public topProds!: any[];

  constructor( public shopService: ShopService,
                public cartService: CartService ) { }

  ngOnInit(): void {

    this.getTopProds();

    // this.shopService.productList$.subscribe(res =>{ this.topProds = res;
    // console.log(res);
    // })

    
  }

  getTopProds() {
    let dataCont: any[];
    this.shopService.getProducts()
        .subscribe(res => {
          dataCont = res.data.otherProducts;
          dataCont.sort(function(a, b) {
            return parseFloat(b.seller.sellerRating) - parseFloat(a.seller.sellerRating);
        });
        this.topProds = dataCont.splice(0, 3);
        
        
        })
  }

  onClickAdd(prod: any) {
    const quantity = document.getElementById('product-quantity') as HTMLInputElement;
    let model: AddToCart={
      id:prod.id,
      quantity: Number(quantity.value)
    };

    this.cartService.addToCart(model)
        .subscribe(res => {
          console.log(res);
        })
    

  }

}
