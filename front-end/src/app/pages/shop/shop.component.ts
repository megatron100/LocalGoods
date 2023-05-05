import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Store } from '@ngrx/store';
import * as fromShop from '../../store/index';
import { ShopState } from '../../store/shop.reducer';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, Subscription, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { IProduct } from '../../core';
import { AutoUnsubscribe } from '../../shared/utils/decorators';

@AutoUnsubscribe('getStateSubs')
@AutoUnsubscribe('getCartSubs')
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products$!: Observable<IProduct[]>;
  sortValue = '';
  searchValue = '';
  category = '';
  pageSizeOptions = [10, 20, 60, 100];
  length = 0;
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;
  pageEvent!: PageEvent;
  private getStateSubs = new Subscription();
  private getCartSubs = new Subscription();

  constructor(
    public shopService: ShopService,
    public cartService: CartService,
    private store: Store<fromShop.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getStateSubs.add(
      this.store.select('sortData').subscribe((state: ShopState) => {
        this.sortValue = state.sort;
        this.searchValue = state.search;
        this.category = state.filterCat;
      })
    );
    this.getCartSubs.add(this.cartService.getCart().subscribe());
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  private getProducts(): void {
    this.products$ = this.shopService.getProducts().pipe(
      tap((response) => (this.length = response.data?.otherProducts.length)),
      map((response) => {
        return response.data?.otherProducts;
      })
    );
  }
}
