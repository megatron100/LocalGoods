import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {IProduct} from "../../interfaces/product";
import {Store} from "@ngrx/store";
import * as fromShop from '../../pages/store/index'
import {ShopState} from "../store/shop.reducer";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[] = []
  sortValue: string = '';
  searchValue: string = '';

  constructor(
    private shopService: ShopService,
    private store: Store<fromShop.AppState>
  ) {
  }

  ngOnInit(): void {
    this.products = this.shopService.products

    this.store.select('sortData')
      .subscribe((state: ShopState) => {
        this.sortValue = state.sort
      })

    this.store.select('sortData')
      .subscribe((state: ShopState) => {
        this.searchValue = state.search
      })
  }

}
