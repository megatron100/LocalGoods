import {Action} from "@ngrx/store";
import {SellerProductItemModel} from "../pages/seller-admin-panel/models/seller-product-item.model";

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCT = 'SET_PRODUCT';

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: SellerProductItemModel[]) {
  }
}

export class SetProduct implements Action {
  readonly type = SET_PRODUCT;

  constructor(public payload: SellerProductItemModel) {
  }
}

export type SellerProductsActions = SetProducts | SetProduct
