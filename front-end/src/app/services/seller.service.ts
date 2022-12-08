import { Injectable } from '@angular/core';
import * as fromSellerProductList from '../store'
import * as ProductActions from '../store/seller-product.actions'
import {Store} from "@ngrx/store";
import {SellerProductItemModel} from "../pages/seller-admin-panel/models/seller-product-item.model";

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(public store: Store<fromSellerProductList.AppState>) { }

  setProducts(products: SellerProductItemModel[]) {
this.store.dispatch(new ProductActions.SetProducts(products))
  }
}
