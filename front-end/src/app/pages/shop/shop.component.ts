import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {Store} from "@ngrx/store";
import * as fromShop from '../../store/index'
import {ShopState} from "../../store/shop.reducer";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: any[] = [];
  sortValue: string = '';
  searchValue: string = '';

  constructor(
    public shopService: ShopService,
    private store: Store<fromShop.AppState>
  ) {
  }

  ngOnInit(): void {

    this.getProducts();

    this.store.select('sortData')
      .subscribe((state: ShopState) => {
        this.sortValue = state.sort
      })

    this.store.select('sortData')
      .subscribe((state: ShopState) => {
        this.searchValue = state.search
      });

    // this.products = this.shopService.productList$.value;
  }

  getProducts(): void {
    this.shopService.getProducts()
      .subscribe(response => {
        this.products = response.data.otherProducts;
        for (let item of this.products) {
          console.log(item.imageLink);

        }

      })
  }


}
