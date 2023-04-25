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
import {
  CategoryResponseData,
  ProductResponseData,
  ResponseData,
} from '../core';
import {
  SellerProductItem,
  SellerProductResponseData,
} from '../core/interfaces/responseDatas/SellerProductResponseData';

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
      .post<SellerProductResponseData>(
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
      .delete<SellerProductResponseData>(
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
      .put<SellerProductResponseData>(
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
      .get<ProductResponseData>(
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
      .get<SellerProductResponseData>(
        `/${API_PATH_SELLER}/${PATH_GET_PRODUCTS}`
      )
      .pipe(
        catchError(this.errorService.handleError),
        map(({ data }) => {
          return this.userService.transformProductArrResponse(data);
        })
      );
  }

  getCategories(): Observable<CategoryResponseData> {
    return this.http
      .get<CategoryResponseData>(`/${API_PATH}/${PATH_GET_CATEGORIES}`)
      .pipe(catchError(this.errorService.handleError));
  }

  uploadImage(file: FormData): Observable<ResponseData> {
    return this.http
      .post<ResponseData>(`${API}${API_PATH}/${PATH_UPLOAD}`, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .pipe(catchError(this.errorService.handleError));
  }
}
