import * as ShopActions from './shop.actions'

export interface State {
  sort: string,
  search: string
}

export interface ShopState {
  shopState: State
}

const initialState: State = {
  sort: '',
  search: ''
}

export function ShopReducer(
  state: State = initialState,
  action: ShopActions.ShopActions
) {
  switch (action.type) {
    case ShopActions.SORT_PRODUCTS:
      return {
        ...state,
        sort: action.payload
      };
    case ShopActions.SEARCH_PRODUCTS:
      return {
        ...state,
        search: action.payload
      };
    default: return state
  }
}
