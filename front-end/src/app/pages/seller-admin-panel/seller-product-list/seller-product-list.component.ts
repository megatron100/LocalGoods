import {Component, OnDestroy, OnInit} from '@angular/core';
import {SellerProductStorageService} from "../../../services/seller-product-storage.service";
import {Subscription} from "rxjs";
import {SellerProductItemModel} from "../models/seller-product-item.model";
import * as fromSellerProductList from '../../../store'
import {Store} from "@ngrx/store";
import {SellerProductState} from "../../../store/seller-product.reducer";
import {SellerService} from "../../../services/seller.service";

@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.scss']
})
export class SellerProductListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  products!: SellerProductItemModel[]

  constructor(
    public sellerStorageService: SellerProductStorageService,
    public store: Store<fromSellerProductList.AppState>,
    public sellerService: SellerService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('sellerProductData')
      .subscribe((state: SellerProductState) => {
        this.products = state.sellerProducts
      })

    this.sellerStorageService.getProducts()
      .subscribe({
        next: (res: SellerProductItemModel[]) => {
          this.sellerService.setProducts(res)
        }
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
