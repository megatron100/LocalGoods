import { Injectable } from '@angular/core';
import {
  API,
  API_PATH_SELLER, PATH_ADD_CERTIFICATE,
  PATH_ADD_PRODUCT,
  PATH_DELETE_PRODUCT_BY_ID,
  PATH_EDIT_PRODUCT_BY_ID,
  PATH_GET_PRODUCT_BY_ID,
  PATH_GET_PRODUCTS,
} from "../constants/constants";
import {IProduct} from "../interfaces/product";
import {HttpClient} from "@angular/common/http";
import {CertificateModel} from "../pages/seller-admin-panel/models/certificate.model";

@Injectable({
  providedIn: 'root'
})
export class SellerProductStorageService {

  constructor(private http: HttpClient) { }

  storeProduct(product: IProduct) {
    return this.http.post<IProduct[]>(`${API}/${API_PATH_SELLER}/${PATH_ADD_PRODUCT}`, product)
      .pipe(

      )
  };

  deleteProduct(id: string) {
    return this.http.delete<IProduct[]>(`${API}/${API_PATH_SELLER}/${PATH_DELETE_PRODUCT_BY_ID}/${id}`)
      .pipe(

      )
  };

  updateProduct(id: string, product: IProduct) {
    return this.http.put<IProduct[]>(`${API}/${API_PATH_SELLER}/${PATH_EDIT_PRODUCT_BY_ID}/${id}`, product)
      .pipe(

      )
  };

  getProductById(id: string) {
    return this.http.get<IProduct[]>(`${API}/${API_PATH_SELLER}/${PATH_GET_PRODUCT_BY_ID}/${id}`)
      .pipe(

      )
  };

  getProducts() {
    return this.http.get<IProduct[]>(`${API}/${API_PATH_SELLER}/${PATH_GET_PRODUCTS}`)
      .pipe(

      )
  };

  addCertificate(body: CertificateModel) {
    return this.http.put<IProduct[]>(`${API}/${API_PATH_SELLER}/${PATH_ADD_CERTIFICATE}`, body)
      .pipe(

      )
  };
}
