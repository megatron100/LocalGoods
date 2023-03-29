import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Store } from '@ngrx/store';
import * as fromShop from '../../store/index';
import { ShopState } from '../../store/shop.reducer';
import { CartService } from 'src/app/services/cart.service';
import { MessageDialogComponent } from 'src/app/shared/dialogs/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddToCart } from '../../core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  sortValue: string = '';
  searchValue: string = '';
  category: string = '';

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
      console.log('categ', state.filterCat);
      this.category = state.filterCat;
    });
  }

  getProducts(): void {
    this.shopService.getProducts().subscribe((response) => {
      this.products = response.data.otherProducts;
    });
  }

  onClickAdd(prod: any) {
    let model: AddToCart = {
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
