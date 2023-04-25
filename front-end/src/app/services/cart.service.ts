import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  AddToCartResponseData,
  CartData,
  CartItem,
  ProductData,
  ResponseData,
} from '../core';
import { API_PATH } from '../shared/constants/constants';
import { ErrorService } from '../shared/error-handling/error.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartContent = new BehaviorSubject<CartItem[]>([]);
  totalCartQuantity = new BehaviorSubject<null | CartData>(null);
  private cart: CartItem[] = [];

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  addToCart(model: AddToCartResponseData): Observable<ResponseData<CartData>> {
    return this.http
      .post<ResponseData<CartData>>(`${API_PATH}/Cart/AddToCart`, model)
      .pipe(
        tap((cart) => {
          this.setCart(cart.data.cartItems);
        }),
        catchError(this.errorService.handleError)
      );
  }

  getCart(): Observable<ResponseData<CartData>> {
    return this.http
      .get<ResponseData<CartData>>(`${API_PATH}/Cart/CartItems`)
      .pipe(
        tap((cart) => {
          this.setCart(cart.data.cartItems);
          this.setTotalCartQuantity(cart.data);
        }),
        catchError(this.errorService.handleError)
      );
  }

  removeItem(id: number): Observable<ResponseData<CartData>> {
    return this.http
      .delete<ResponseData<CartData>>(`${API_PATH}/Cart/remove/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  clearCart(): Observable<ResponseData<ProductData>> {
    return this.http
      .delete<ResponseData<ProductData>>(`${API_PATH}/Cart/ClearCart`)
      .pipe(catchError(this.errorService.handleError));
  }

  orderFromCart(): Observable<ResponseData<ProductData>> {
    return this.http
      .get<ResponseData<ProductData>>(`${API_PATH}/order/orderfromcart`)
      .pipe(catchError(this.errorService.handleError));
  }

  decreaseQuantity(id: number): Observable<ResponseData<ProductData>> {
    return this.http
      .delete<ResponseData<ProductData>>(`${API_PATH}/Cart/minus/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  changeQuantity(id: number, newQuantity: number, newAmount: number) {
    this.cart.forEach((item, index) => {
      if (item.product.id === id) {
        item.quantity = newQuantity;
        item.totalAmount = newAmount;
      }
      //delete item from cart array if quantity === 0
      if (item.quantity === 0) {
        this.cart.splice(index, 1);
      }
    });
    this.cartContent.next(this.cart.slice());
  }

  removeItemFromCart(id: number) {
    for (const cart of this.cart) {
      if (cart.id === id) {
        const indexInArr = this.cart.indexOf(cart);
        this.cart.splice(indexInArr, 1);
      }
    }
    this.cartContent.next(this.cart.slice());
  }

  calcOrderData() {
    const orderData = this.cart.reduce(
      (orderData, item) => {
        orderData.quantity += item.quantity;
        orderData.amount += item.quantity * item.product.price;
        return orderData;
      },
      { quantity: 0, amount: 0 }
    );
    this.totalCartQuantity.next({
      cartItems: this.cart,
      totalAmount: orderData.amount,
      totalQuantity: orderData.quantity,
    });
  }

  private setCart(cart: CartItem[]) {
    this.cart = cart;
    this.cartContent.next(this.cart.slice());
  }

  private setTotalCartQuantity(totalCartQuantity: null | CartData) {
    this.totalCartQuantity.next(totalCartQuantity);
  }
}
