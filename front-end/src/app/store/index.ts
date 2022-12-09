import {shopReducer, ShopState} from './shop.reducer'
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  sortData: ShopState
}

export const reducers: ActionReducerMap<AppState, any> = {
  sortData: shopReducer
}
