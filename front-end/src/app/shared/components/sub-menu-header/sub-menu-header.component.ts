import { Component, OnInit } from '@angular/core';
import {PRODUCT_SORT_VALUES} from "../../constants/constants";
import {Store} from "@ngrx/store";
import * as fromShop from '../../../store/index';
import * as ShopActions from '../../../store/shop.actions';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-sub-menu-header',
  templateUrl: './sub-menu-header.component.html',
  styleUrls: ['./sub-menu-header.component.scss']
})
export class SubMenuHeaderComponent implements OnInit {

  sortValues: string[] = PRODUCT_SORT_VALUES;
  categories!: any[];


  constructor(private store: Store<fromShop.AppState>,
              private shopService: ShopService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.shopService.getCategories()
        .subscribe(res => {
          this.categories = ['', ...res.data];

        })

  }

  sortValueChange($event: any) {
    this.store.dispatch(new ShopActions.SortProducts($event.target.value))
  }

  searchChange($event: any) {
    this.store.dispatch(new ShopActions.SearchProducts($event.target.value))
  }

  filterCategory($event: any) {
    this.store.dispatch(new ShopActions.FilterCategories($event.target.value))
  }
}
