import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromShop from '../store';
import * as UserActions from '../store/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { SellerProductItemModel } from '../pages/seller-admin-panel/models/seller-product-item.model';
import { IProduct, ResponseData, SellerInfo, User } from '../core';
import { API_PATH, PATH_GET_PROFILE } from '../shared/constants/constants';
import { SellerProductItem } from '../core/interfaces/responseDatas/SellerProductResponseData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private store: Store<fromShop.AppState>,
    public dialog: MatDialog
  ) {}

  updateUser() {
    return this.http
      .get<ResponseData<User>>(`/${API_PATH}/${PATH_GET_PROFILE}`)
      .subscribe(({ data }) => {
        this.updateUserInStore(data);
      });
  }

  updateUserInStore(data: User) {
    const updatedUserData: SellerInfo = {
      address: {
        postCode: '',
        country: '',
        city: '',
        area: '',
      },
      basicInfo: {
        name: '',
        mobile: '',
        certification: {
          qualityCertificateTitle: '',
          qualityCertificateDescription: '',
          qualityCertificateLink: '',
          taxNumber: '',
        },
      },
    };

    if (data.certification !== null) {
      this.updateSellerData(data, updatedUserData);
      updatedUserData.basicInfo.certification.qualityCertificateTitle =
        data?.certification.qualityCertificateTitle;
      updatedUserData.basicInfo.certification.qualityCertificateDescription =
        data?.certification.qualityCertificateDescription;
      updatedUserData.basicInfo.certification.qualityCertificateLink =
        data?.certification.taxNumber;
      updatedUserData.basicInfo.certification.taxNumber =
        data?.certification.taxNumber;
    } else {
      this.updateSellerData(data, updatedUserData);
    }
    this.store.dispatch(new UserActions.UpdateUser(updatedUserData));
  }

  transformProductArrResponse(data: IProduct[]) {
    const newProductArr: SellerProductItem[] = [];
    data.forEach((product: IProduct) => {
      const productEl = new SellerProductItemModel(
        product.productTitle,
        product.imageLink,
        product.productCategory.productCategoryName,
        product.price,
        product.shortDescription,
        product.longDescription,
        product.id
      );
      newProductArr.push(productEl);
    });
    return newProductArr;
  }

  transformProductResponse(data: IProduct) {
    return new SellerProductItemModel(
      data.productTitle,
      data.imageLink,
      data.productCategory.productCategoryName,
      data.price,
      data.shortDescription,
      data.longDescription,
      data.id
    );
  }

  private updateSellerData(data: User, updatedUserData: SellerInfo) {
    updatedUserData.address.area = data?.address?.area;
    updatedUserData.address.postCode = data?.address?.pinCode;
    updatedUserData.address.country = data?.address?.country;
    updatedUserData.address.city = data?.address?.city;
    updatedUserData.basicInfo.name = data?.name;
    updatedUserData.basicInfo.mobile = data?.mobile;
  }
}
