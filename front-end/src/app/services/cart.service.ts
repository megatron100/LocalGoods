import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { API, API_PATH,  } from '../constants/constants';
import { Observable, of } from 'rxjs';
import { AddToCart } from '../interfaces/addToCartModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private http: HttpClient ) { }

  cartContent: any[] = [];

  addToCart( model:AddToCart): Observable<any> {

    return this.http.post<AddToCart>(`${API}${API_PATH}/Cart/AddToCart`, model)
          .pipe(
            catchError(this.handleError<any>('getData')),
          );
  }

  getCart(): Observable<any> {
    return this.http.get<any>(`${API}${API_PATH}/Cart/CartItems`)
                .pipe(
                  catchError(this.handleError<any>('getData'))
                )
  }

  removeItem(id: number) {
    return this.http.delete<any>(`${API}${API_PATH}/Cart/remove/${id}`)
    .pipe(
      catchError(this.handleError<any>('getData'))
    )
  }

  clearCart() {
    return this.http.delete<any>(`${API}${API_PATH}/Cart/ClearCart`)
        .pipe(
          catchError(this.handleError<any>('getData'))
        )
  }
  orderFromCart(){
    return this.http.get<any>(`${API}${API_PATH}/order/orderfromcart`)
        .pipe(
          catchError(this.handleError<any>('getData'))
        )
  }
  minusQuantity(id: number) {
    return this.http.delete<any>(`${API}${API_PATH}/Cart/minus/${id}`)
        .pipe(
          catchError(this.handleError<any>('getData'))
        )

  }
   


  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }

  }

  
}
