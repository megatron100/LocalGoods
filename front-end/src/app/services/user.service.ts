import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserUpdateResponseData} from "../interfaces/userUpdateResponseData";
import {API, API_PATH, PATH_GET_PROFILE} from "../constants/constants";
import {Store} from "@ngrx/store";
import * as fromShop from "../store";
import * as UserActions from '../store/user.actions';
import {MatDialog} from "@angular/material/dialog";
import {SellerProductItemModel} from "../pages/seller-admin-panel/models/seller-product-item.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store: Store<fromShop.AppState>, public dialog: MatDialog) {
  }

  updateUser() {
    return this.http.get<UserUpdateResponseData>(`${API}${API_PATH}/${PATH_GET_PROFILE}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
      .subscribe(({data, message}) => {
        this.updateUserInStore(data)
      })
  }

  updateUserInStore(data: any) {
    const updatedUserData = {
      "address": {
        "postCode": '',
        "country": '',
        "city": '',
        "area": ''
      },
      "basicInfo": {
        "name": '',
        "mobile": ''
      }
    }
    if (data) {
      updatedUserData.address.area = data?.address?.area;
      updatedUserData.address.postCode = data?.address?.pinCode;
      updatedUserData.address.country = data?.address?.country;
      updatedUserData.address.city = data?.address?.city;
      updatedUserData.basicInfo.name = data?.name;
      updatedUserData.basicInfo.mobile = data?.mobile;
    }
    this.store.dispatch(new UserActions.UpdateUser(updatedUserData))
  }

  transformProductArrResponse(data: any) {
    let newProductArr: SellerProductItemModel[] = [];
    data.forEach((product: any) => {
      const productEl = new SellerProductItemModel(product.productTitle, product.imageLink, product.productCategory.productCategoryName, product.price, product.shortDescription, product.longDescription, product.id);
      newProductArr.push(productEl)
    })
    return newProductArr
  }

  transformProductResponse(data: any) {
    return new SellerProductItemModel(data.productTitle, data.imageLink, data.productCategory.productCategoryName, data.price, data.shortDescription, data.longDescription, data.id)
  }

}
