import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  AddToCartResponseData,
  CartData,
  CartItem,
  CartResponseData,
  ProductResponseData,
} from '../core';
import { API_PATH } from '../shared/constants/constants';
import { ErrorService } from '../shared/error-handling/error.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartContent = new BehaviorSubject<CartItem[]>([]);
  totalCartQuantity = new BehaviorSubject<null | CartData>(null);
  cartCounter = new BehaviorSubject<number>(0);
  private cart: CartItem[] = [];

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  addToCart(model: AddToCartResponseData): Observable<CartResponseData> {
    return this.http
      .post<CartResponseData>(`${API_PATH}/Cart/AddToCart`, model)
      .pipe(catchError(this.errorService.handleError));
  }

  getCart(): Observable<CartResponseData> {
    return this.http.get<CartResponseData>(`${API_PATH}/Cart/CartItems`).pipe(
      tap((cart) => {
        console.log('get');
        this.setCart(cart.data.cartItems);
        this.setTotalCartQuantity(cart.data);
      }),
      catchError(this.errorService.handleError)
    );
  }

  removeItem(id: number): Observable<CartResponseData> {
    return this.http
      .delete<CartResponseData>(`${API_PATH}/Cart/remove/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  clearCart(): Observable<ProductResponseData> {
    return this.http
      .delete<ProductResponseData>(`${API_PATH}/Cart/ClearCart`)
      .pipe(catchError(this.errorService.handleError));
  }

  orderFromCart(): Observable<ProductResponseData> {
    return this.http
      .get<ProductResponseData>(`${API_PATH}/order/orderfromcart`)
      .pipe(catchError(this.errorService.handleError));
  }

  decreaseQuantity(id: number): Observable<ProductResponseData> {
    return this.http
      .delete<ProductResponseData>(`${API_PATH}/Cart/minus/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  changeQuantity(id: number, newQuantity: number, newAmount: number) {
    for (const cart of this.cart) {
      if (cart.product.id === id) {
        cart.quantity = newQuantity;
        cart.totalAmount = newAmount;
      }
    }
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
