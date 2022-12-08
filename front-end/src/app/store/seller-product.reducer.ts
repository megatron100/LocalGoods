import {SellerProductItemModel} from "../pages/seller-admin-panel/models/seller-product-item.model";
import * as ProductAction from './seller-product.actions'

export interface SellerProductState {
  sellerProducts: SellerProductItemModel[],
  sellerProduct: SellerProductItemModel | null
}

const initialState: SellerProductState = {
  sellerProducts: [],
  sellerProduct: null
}

export function sellerProductReducer(
  state: SellerProductState = initialState,
  {payload, type}: ProductAction.SellerProductsActions
): SellerProductState {
  switch (type) {
    case ProductAction.SET_PRODUCTS:
      return {
        ...state,
        sellerProducts: [...payload]
      };
    case ProductAction.SET_PRODUCT:
      return {
        ...state,
        sellerProduct: payload
      };
    default:
      return state;
  }
}
