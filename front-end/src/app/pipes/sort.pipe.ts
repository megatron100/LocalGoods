import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from "../interfaces/product";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(products: IProduct[], args: string): IProduct[] {
    let sorted = [...products];
    switch (args) {
      case 'ASC Name':
        sorted.sort((a: IProduct, b: IProduct) => {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
            return -1
          }
          return 0
        })
        break;

      case 'DESC Name':
        sorted.sort((a: IProduct, b: IProduct) => {
          if (b.name > a.name) {
            return 1
          }
          if (b.name < a.name) {
            return -1
          }
          return 0
        })
        break;
      case 'ASC Price':
        sorted.sort((a: IProduct, b: IProduct) => {
          if (a.price > b.price) {
            return 1
          }
          if (a.price < b.price) {
            return -1
          }
          return 0
        })
        break;

      case 'DSC Price':
        sorted.sort((a: IProduct, b: IProduct) => {
          if (b.price > a.price) {
            return 1
          }
          if (b.price < a.price) {
            return -1
          }
          return 0
        })
        break;
    }
    return sorted.slice();
  }

}
