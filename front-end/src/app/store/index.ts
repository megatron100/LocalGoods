import {shopReducer, ShopState} from './shop.reducer'
import {ActionReducerMap} from "@ngrx/store";
import {userReducer, UserState} from "./user.reducer";
import {sellerProductReducer, SellerProductState} from "./seller-product.reducer";

export interface AppState {
  sortData: ShopState,
  userData: UserState,
  sellerProductData: SellerProductState
}

export const reducers: ActionReducerMap<AppState, any> = {
  sortData: shopReducer,
  userData: userReducer,
  sellerProductData: sellerProductReducer
}
