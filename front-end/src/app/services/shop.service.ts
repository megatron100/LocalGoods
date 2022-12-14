import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {IProduct} from "../interfaces/product";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API, API_PATH,  } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor( private http: HttpClient ) { }

  public productList$ = new BehaviorSubject([]);
  products: IProduct[] = [
    {
      name: 'Cheese',
      photo: '/assets/images/shutterstock_133908008-1.jpg',
      price: 23.5,
      description: 'Gouda Cheese – Nutrition, Health Benefits, and Side Effects',
      seller: 'seller 1'
    },
    {
      name: 'Salad',
      photo: '/assets/images/gen-lettuce.jpeg',
      price: 7.54,
      description: 'Leaf lettuce is a loose-leaf mild-flavored, leaf vegetable commonly used in salads and sandwiches',
      seller: 'seller 2'
    },
    {
      name: 'Milk',
      photo: '/assets/images/depositphotos_118507928-stock-photo-glass-jug-with-milk-and.jpg',
      price: 9.24,
      description: 'Glass jug with milk and a glass on the nature',
      seller: 'seller 2'
    },
  ];

  getProducts() {
    return this.http.get<any>(`${API}${API_PATH}/Home/GetProducts`)
          .pipe(
            catchError(this.handleError<any>('getData')),
          )
          // .subscribe(res => {            
          //   this.productList$.next(res.data.otherProducts)
          // });
  }

  getProductDets(id: number): Observable<any> {
    return this.http.get<any>(`${API}${API_PATH}/Home/GetProductById/${id}`)
                .pipe(
                  catchError(this.handleError<any>('getData')),
                );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${API}${API_PATH}/Categories`)
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
