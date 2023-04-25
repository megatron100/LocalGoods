import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IProduct, ProductCategory, ProductData, ResponseData } from '../core';
import { API_PATH } from '../shared/constants/constants';
import { ErrorService } from '../shared/error-handling/error.service';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getProducts(): Observable<ResponseData<ProductData>> {
    return this.http
      .get<ResponseData<ProductData>>(`/${API_PATH}/Home/GetProducts`)
      .pipe(catchError(this.errorService.handleError));
  }

  getProductDetails(id: number): Observable<ResponseData<IProduct>> {
    return this.http
      .get<ResponseData<IProduct>>(`/${API_PATH}/Home/GetProductById/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  getCategories(): Observable<ResponseData<ProductCategory[]>> {
    return this.http
      .get<ResponseData<ProductCategory[]>>(`/${API_PATH}/Categories`)
      .pipe(catchError(this.errorService.handleError));
  }
}
