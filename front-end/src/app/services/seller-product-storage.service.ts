import {Injectable} from '@angular/core';
import {
  API, API_PATH,
  API_PATH_SELLER, PATH_ADD_CERTIFICATE,
  PATH_ADD_PRODUCT,
  PATH_DELETE_PRODUCT_BY_ID,
  PATH_EDIT_PRODUCT_BY_ID, PATH_GET_CATEGORIES,
  PATH_GET_PRODUCT_BY_ID,
  PATH_GET_PRODUCTS,
} from "../constants/constants";
import {IProduct} from "../interfaces/product";
import {HttpClient} from "@angular/common/http";
import {CertificateModel} from "../pages/seller-admin-panel/models/certificate.model";
import {map} from "rxjs";
import {UserService} from "./user.service";
import {SellerProductItemModel} from "../pages/seller-admin-panel/models/seller-product-item.model";

@Injectable({
  providedIn: 'root'
})
export class SellerProductStorageService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  storeProduct(product: SellerProductItemModel) {
    console.log(product)
    return this.http.post<any>(`${API}/${API_PATH_SELLER}/${PATH_ADD_PRODUCT}`, product)
      .pipe(
        map(({data}) => {
          return this.userService.transformProductArrResponse(data)
        })
      )
  };

  deleteProduct(id: string) {
    return this.http.delete<any>(`${API}/${API_PATH_SELLER}/${PATH_DELETE_PRODUCT_BY_ID}/${id}`)
      .pipe(
        map(({data}) => {
          return this.userService.transformProductArrResponse(data)
        })
      )
  };

  updateProduct(id: string, product: SellerProductItemModel) {
    const body = {...product, productId: id}
    console.log(body)
    return this.http.put<any>(`${API}${API_PATH_SELLER}/${PATH_EDIT_PRODUCT_BY_ID}`, body)
      .pipe(
        map(({data}) => {
          return this.userService.transformProductArrResponse(data)
        })
      )
  };

  getProductById(id: string) {
    return this.http.get<any>(`${API}/${API_PATH_SELLER}/${PATH_GET_PRODUCT_BY_ID}/${id}`)
      .pipe(
        map(({data}) => {
          return this.userService.transformProductResponse(data)
        })
      )
  };

  getProducts() {
    return this.http.get<any>(`${API}${API_PATH_SELLER}/${PATH_GET_PRODUCTS}`)
      .pipe(
        map(({data}) => {
          return this.userService.transformProductArrResponse(data)
        })
      )
  };

  addCertificate(body: CertificateModel) {
    return this.http.put<IProduct[]>(`${API}/${API_PATH_SELLER}/${PATH_ADD_CERTIFICATE}`, body)
      .pipe(

      )
  };

  getCategories() {
    return this.http.get<any>(`${API}/${API_PATH}/${PATH_GET_CATEGORIES}`)
      .pipe(

      )
  };
}
