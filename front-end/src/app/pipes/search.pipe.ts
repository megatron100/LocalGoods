import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from "../interfaces/product";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: IProduct[], args: string): unknown {
    let search = [...products];
    if (args) {
      return search.filter(product => product.name.search(args) !== -1).slice()
    }
    return products.slice();
  }

}
