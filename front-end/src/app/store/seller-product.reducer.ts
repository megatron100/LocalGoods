import { SellerProductItemModel } from '../pages/seller-admin-panel/models/seller-product-item.model';
import * as ProductAction from './seller-product.actions';

export interface SellerProductState {
  sellerProducts: SellerProductItemModel[];
  sellerProduct: SellerProductItemModel | null;
  isCreateMode: boolean;
  categoryList: [];
}

const initialState: SellerProductState = {
  sellerProducts: [],
  sellerProduct: null,
  isCreateMode: true,
  categoryList: [],
};

export function sellerProductReducer(
  state: SellerProductState = initialState,
  { payload, type }: ProductAction.SellerProductsActions
): SellerProductState {
  switch (type) {
    case ProductAction.SET_PRODUCTS:
      return {
        ...state,
        sellerProducts: [...payload],
      };
    case ProductAction.SET_PRODUCT:
      return {
        ...state,
        sellerProduct: payload,
      };
    case ProductAction.CHANGE_MODE:
      return {
        ...state,
        isCreateMode: payload,
      };
    case ProductAction.GET_CATEGORIES:
      return {
        ...state,
        categoryList: [...payload],
      };
    default:
      return state;
  }
}
