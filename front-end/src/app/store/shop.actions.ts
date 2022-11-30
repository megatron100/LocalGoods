import {Action} from "@ngrx/store";

export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';


export class SortProducts implements Action{
  readonly type = SORT_PRODUCTS;

  constructor(public payload: string) {
  }
}

export class SearchProducts implements Action{
  readonly type = SEARCH_PRODUCTS;

  constructor(public payload: string) {
  }
}

export type ShopActions = SortProducts | SearchProducts
