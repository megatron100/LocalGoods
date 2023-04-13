import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddToCartResponseData } from '../core';
import { API_PATH } from '../shared/constants/constants';
import { ErrorService } from '../shared/error-handling/error.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartContent: any[] = [];

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  addToCart(model: AddToCartResponseData): Observable<any> {
    return this.http
      .post<AddToCartResponseData>(`${API_PATH}/Cart/AddToCart`, model)
      .pipe(catchError(this.errorService.handleError));
  }

  getCart(): Observable<any> {
    return this.http
      .get<any>(`${API_PATH}/Cart/CartItems`)
      .pipe(catchError(this.errorService.handleError));
  }

  removeItem(id: number) {
    return this.http
      .delete<any>(`${API_PATH}/Cart/remove/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  clearCart() {
    return this.http
      .delete<any>(`${API_PATH}/Cart/ClearCart`)
      .pipe(catchError(this.errorService.handleError));
  }

  orderFromCart() {
    return this.http
      .get<any>(`${API_PATH}/order/orderfromcart`)
      .pipe(catchError(this.errorService.handleError));
  }

  minusQuantity(id: number) {
    return this.http
      .delete<any>(`${API_PATH}/Cart/minus/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }
}
