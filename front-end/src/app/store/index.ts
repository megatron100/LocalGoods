import {shopReducer, ShopState} from './shop.reducer'
import {ActionReducerMap} from "@ngrx/store";
import {userReducer, UserState} from "./user.reducer";

export interface AppState {
  sortData: ShopState,
  userData: UserState
}

export const reducers: ActionReducerMap<AppState, any> = {
  sortData: shopReducer,
  userData: userReducer
}
