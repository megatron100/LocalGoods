import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { UserService } from './user.service';
import { ErrorService } from '../shared/error-handling/error.service';
import {
  API,
  API_PATH,
  API_PATH_SELLER,
  PATH_ADD_PRODUCT,
  PATH_DELETE_PRODUCT_BY_ID,
  PATH_EDIT_PRODUCT_BY_ID,
  PATH_GET_CATEGORIES,
  PATH_GET_PRODUCT_BY_ID,
  PATH_GET_PRODUCTS,
  PATH_UPLOAD,
} from '../shared/constants/constants';
import { IProduct, ProductCategory, ResponseData } from '../core';
import { SellerProductItem } from '../core/interfaces/responseDatas/SellerProductResponseData';

@Injectable({
  providedIn: 'root',
})
export class SellerProductStorageService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private errorService: ErrorService
  ) {}

  storeProduct(product: SellerProductItem): Observable<SellerProductItem[]> {
    return this.http
      .post<ResponseData<IProduct[]>>(
        `/${API_PATH_SELLER}/${PATH_ADD_PRODUCT}`,
        product
      )
      .pipe(
        catchError(this.errorService.handleError),
        map(({ data }) => {
          return this.userService.transformProductArrResponse(data);
        })
      );
  }

  deleteProduct(id: string): Observable<SellerProductItem[]> {
    return this.http
      .delete<ResponseData<IProduct[]>>(
        `/${API_PATH_SELLER}/${PATH_DELETE_PRODUCT_BY_ID}/${id}`
      )
      .pipe(
        catchError(this.errorService.handleError),
        map(({ data }) => {
          return this.userService.transformProductArrResponse(data);
        })
      );
  }

  updateProduct(
    id: string,
    product: SellerProductItem
  ): Observable<SellerProductItem[]> {
    const body = { ...product, productId: id };
    return this.http
      .put<ResponseData<IProduct[]>>(
        `/${API_PATH_SELLER}/${PATH_EDIT_PRODUCT_BY_ID}`,
        body
      )
      .pipe(
        catchError(this.errorService.handleError),
        map(({ data }) => {
          return this.userService.transformProductArrResponse(data);
        })
      );
  }

  getProductById(id: string): Observable<SellerProductItem> {
    return this.http
      .get<ResponseData<IProduct>>(
        `/${API_PATH_SELLER}/${PATH_GET_PRODUCT_BY_ID}/${id}`
      )
      .pipe(
        catchError(this.errorService.handleError),
        map(({ data }) => {
          console.log('Product: ', data);
          return this.userService.transformProductResponse(data);
        })
      );
  }

  getProducts(): Observable<SellerProductItem[]> {
    return this.http
      .get<ResponseData<IProduct[]>>(`/${API_PATH_SELLER}/${PATH_GET_PRODUCTS}`)
      .pipe(
        catchError(this.errorService.handleError),
        map(({ data }) => {
          return this.userService.transformProductArrResponse(data);
        })
      );
  }

  getCategories(): Observable<ResponseData<ProductCategory[]>> {
    return this.http
      .get<ResponseData<ProductCategory[]>>(
        `/${API_PATH}/${PATH_GET_CATEGORIES}`
      )
      .pipe(catchError(this.errorService.handleError));
  }

  uploadImage(file: FormData): Observable<ResponseData<string>> {
    return this.http
      .post<ResponseData<string>>(`${API}${API_PATH}/${PATH_UPLOAD}`, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .pipe(catchError(this.errorService.handleError));
  }
}
