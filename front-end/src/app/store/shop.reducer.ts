import * as ShopActions from './shop.actions';

export interface ShopState {
  sort: string;
  search: string;
  filterCat: string;
}

const initialState: ShopState = {
  sort: '',
  search: '',
  filterCat: '',
};

export function shopReducer(
  state: ShopState = initialState,
  { payload, type }: ShopActions.ShopActions
): ShopState {
  switch (type) {
    case ShopActions.SORT_PRODUCTS:
      return {
        ...state,
        sort: payload,
      };
    case ShopActions.SEARCH_PRODUCTS:
      return {
        ...state,
        search: payload,
      };
    case ShopActions.FILTER_CATEGORIES:
      return {
        ...state,
        filterCat: payload,
      };
    default:
      return state;
  }
}
