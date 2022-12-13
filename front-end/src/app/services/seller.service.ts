import { Injectable } from '@angular/core';
import * as fromSellerProductList from '../store'
import * as ProductActions from '../store/seller-product.actions'
import {Store} from "@ngrx/store";
import {SellerProductItemModel} from "../pages/seller-admin-panel/models/seller-product-item.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {
  API,
  API_PATH,
  Local_API,
  API_PATH_SELLER,
  ORDER_CONFIRM_PATH
} from "../constants/constants";
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(public store: Store<fromSellerProductList.AppState>,private http: HttpClient) { }

  getorders(){
    return this.http.get<any>(`${Local_API}${API_PATH_SELLER}/${ORDER_CONFIRM_PATH}`).pipe()
  };

  setProducts(products: SellerProductItemModel[]) {
this.store.dispatch(new ProductActions.SetProducts(products))
  }
}
