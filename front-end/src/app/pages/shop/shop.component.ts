import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Store } from '@ngrx/store';
import * as fromShop from '../../store/index';
import { ShopState } from '../../store/shop.reducer';
import { CartService } from 'src/app/services/cart.service';
import { MessageDialogComponent } from 'src/app/shared/dialogs/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddToCart, IProduct } from '../../core';
import { map } from 'rxjs';

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

  constructor(
    public shopService: ShopService,
    public cartService: CartService,
    private store: Store<fromShop.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();

    this.store.select('sortData').subscribe((state: ShopState) => {
      console.log('sort', state.sort);
      this.sortValue = state.sort;
    });

    this.store.select('sortData').subscribe((state: ShopState) => {
      console.log('search', state.search);
      this.searchValue = state.search;
    });
    this.store.select('sortData').subscribe((state: ShopState) => {
      console.log('filter', state.filterCat);
      this.category = state.filterCat;
    });
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
        },
        error: (err) => console.error(err),
      });
  }

  onClickAdd(prod: any) {
    const model: AddToCart = {
      id: prod.id,
      quantity: 1,
    };

    this.cartService.addToCart(model).subscribe((res) => {
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: res.message,
      });
      dialogRef.afterClosed();
    });
  }
}
