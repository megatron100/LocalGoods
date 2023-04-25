import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CategoryResponseData, IProduct, ProductsResponseData } from '../core';
import { API_PATH } from '../shared/constants/constants';
import { ErrorService } from '../shared/error-handling/error.service';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  public productList$ = new BehaviorSubject([]);
  products: IProduct[] = [
    // {
    //   productTitle: 'Cheese',
    //   photo: '/assets/images/shutterstock_133908008-1.jpg',
    //   price: 23.5,
    //   description:
    //     'Gouda Cheese – Nutrition, Health Benefits, and Side Effects',
    //   seller: 'seller 1',
    // },
    // {
    //   productTitle: 'Salad',
    //   photo: '/assets/images/gen-lettuce.jpeg',
    //   price: 7.54,
    //   description:
    //     'Leaf lettuce is a loose-leaf mild-flavored, leaf vegetable commonly used in salads and sandwiches',
    //   seller: 'seller 2',
    // },
    // {
    //   productTitle: 'Milk',
    //   photo:
    //     '/assets/images/depositphotos_118507928-stock-photo-glass-jug-with-milk-and.jpg',
    //   price: 9.24,
    //   description: 'Glass jug with milk and a glass on the nature',
    //   seller: 'seller 2',
    // },
  ];

  getProducts(): Observable<ProductsResponseData> {
    return this.http
      .get<ProductsResponseData>(`/${API_PATH}/Home/GetProducts`)
      .pipe(catchError(this.errorService.handleError));
    // .subscribe(res => {
    //   this.productList$.next(res.data.otherProducts)
    // });
  }

  getProductDetails(id: number): Observable<any> {
    return this.http
      .get<any>(`/${API_PATH}/Home/GetProductById/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  getCategories(): Observable<CategoryResponseData> {
    return this.http
      .get<CategoryResponseData>(`/${API_PATH}/Categories`)
      .pipe(catchError(this.errorService.handleError));
  }
}
