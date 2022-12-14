import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public topProds!: any[];

  constructor( public shopService: ShopService ) { }

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

}
