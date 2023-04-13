import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Store } from '@ngrx/store';
import * as fromShop from '../../store/index';
import { ShopState } from '../../store/shop.reducer';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { IProduct } from '../../core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  sortValue = '';
  searchValue = '';
  category = '';
  pageSizeOptions = [10, 20, 60, 100];
  length = 0;
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;
  pageEvent!: PageEvent;

  constructor(
    public shopService: ShopService,
    public cartService: CartService,
    private store: Store<fromShop.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();

    this.store.select('sortData').subscribe((state: ShopState) => {
      this.sortValue = state.sort;
    });
    this.store.select('sortData').subscribe((state: ShopState) => {
      this.searchValue = state.search;
    });
    this.store.select('sortData').subscribe((state: ShopState) => {
      this.category = state.filterCat;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  private getProducts(): void {
    this.shopService
      .getProducts()
      .pipe(
        map((response) => {
          return response.data?.otherProducts;
        })
      )
      .subscribe({
        next: (products) => {
          this.products = products as IProduct[];
          this.length = products?.length;
        },
        error: (err) => console.error(err),
      });
  }
}
