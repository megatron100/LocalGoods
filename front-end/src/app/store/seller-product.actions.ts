import { Action } from '@ngrx/store';
import { SellerProductItemModel } from '../pages/seller-admin-panel/models/seller-product-item.model';
import { ProductCategory } from '../core';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCT = 'SET_PRODUCT';
export const CHANGE_MODE = 'CHANGE_MODE';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: SellerProductItemModel[]) {}
}

export class SetProduct implements Action {
  readonly type = SET_PRODUCT;

  constructor(public payload: SellerProductItemModel) {}
}

export class ChangeMode implements Action {
  readonly type = CHANGE_MODE;

  constructor(public payload: boolean) {}
}

export class GetCategories implements Action {
  readonly type = GET_CATEGORIES;

  constructor(public payload: ProductCategory[]) {}
}

export type SellerProductsActions =
  | SetProducts
  | SetProduct
  | ChangeMode
  | GetCategories;
