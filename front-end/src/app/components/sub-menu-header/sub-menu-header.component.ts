import { Component, OnInit } from '@angular/core';
import {PRODUCT_SORT_VALUES} from "../../constants/constants";
import {Store} from "@ngrx/store";
import * as fromShop from '../../pages/store/index';
import * as ShopActions from '../../pages/store/shop.actions';

@Component({
  selector: 'app-sub-menu-header',
  templateUrl: './sub-menu-header.component.html',
  styleUrls: ['./sub-menu-header.component.scss']
})
export class SubMenuHeaderComponent implements OnInit {

  sortValues: string[] = PRODUCT_SORT_VALUES;

  constructor(private store: Store<fromShop.AppState>) { }

  ngOnInit(): void {
  }

  sortValueChange($event: any) {
    this.store.dispatch(new ShopActions.SortProducts($event.target.value))
  }

  searchChange($event: any) {
    this.store.dispatch(new ShopActions.SearchProducts($event.target.value))
  }
}
