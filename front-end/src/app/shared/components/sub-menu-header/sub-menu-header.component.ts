import { Component, OnInit } from '@angular/core';
import { PRODUCT_SORT_VALUES } from '../../constants/constants';
import { Store } from '@ngrx/store';
import * as fromShop from '../../../store/index';
import * as ShopActions from '../../../store/shop.actions';
import { ShopService } from 'src/app/services/shop.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-sub-menu-header',
  templateUrl: './sub-menu-header.component.html',
  styleUrls: ['./sub-menu-header.component.scss'],
})
export class SubMenuHeaderComponent implements OnInit {
  sortValues: string[] = PRODUCT_SORT_VALUES;
  categories: string[] = ['All goods'];
  value = '';

  constructor(
    private store: Store<fromShop.AppState>,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.sortValueChange(this.sortValues[0]);
    this.filterCategory(this.categories[0]);
  }

  getCategories() {
    this.shopService
      .getCategories()
      .pipe(
        map((response) => {
          const categoryArray: string[] = [];
          for (const category of response.data) {
            categoryArray.push(category.productCategoryName);
          }
          return categoryArray;
        })
      )
      .subscribe({
        next: (categories) =>
          (this.categories = [...this.categories, ...categories]),
        error: (err) => console.error(err),
      });
  }

  sortValueChange($event: string) {
    this.store.dispatch(new ShopActions.SortProducts($event));
  }

  searchChange($event: Event) {
    const searchValue = ($event.target as HTMLInputElement).value;
    this.store.dispatch(new ShopActions.SearchProducts(searchValue));
  }

  filterCategory($event: string) {
    this.store.dispatch(new ShopActions.FilterCategories($event));
  }
}
