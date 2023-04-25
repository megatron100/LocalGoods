import { Injectable } from '@angular/core';
import * as fromSellerProductList from '../store';
import * as ProductActions from '../store/seller-product.actions';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import {
  API_PATH_SELLER,
  ORDER_CONFIRM_PATH,
} from '../shared/constants/constants';
import { SellerProductItem } from '../core/interfaces/responseDatas/SellerProductResponseData';
import { Order, ResponseData } from '../core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(
    public store: Store<fromSellerProductList.AppState>,
    private http: HttpClient
  ) {}

  getOrders(): Observable<ResponseData<Order[]>> {
    return this.http
      .get<ResponseData<Order[]>>(`/${API_PATH_SELLER}/${ORDER_CONFIRM_PATH}`)
      .pipe();
  }

  setProducts(products: SellerProductItem[]) {
    this.store.dispatch(new ProductActions.SetProducts(products));
  }

  //add service for decline order
  declineOrder(id: number): Observable<ResponseData<Order[]>> {
    return this.http.get<ResponseData<Order[]>>(
      `/${API_PATH_SELLER}/decline/${id}`
    );
  }

  deliverOrder(id: number): Observable<ResponseData<Order[]>> {
    return this.http.get<ResponseData<Order[]>>(
      `/${API_PATH_SELLER}/deliver/${id}`
    );
  }
}
