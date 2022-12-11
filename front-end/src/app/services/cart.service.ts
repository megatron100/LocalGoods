import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { API, API_PATH,  } from '../constants/constants';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private http: HttpClient ) { }

  cartContent: any[] = [];

  addToCart(id: number): Observable<any> {
    return this.http.get<any>(`${API}${API_PATH}/Cart/AddToCart/${id}`)
          .pipe(
            catchError(this.handleError<any>('getData')),
          );
  }


  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }

  }

  
}
