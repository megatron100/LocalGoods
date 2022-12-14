import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from "../interfaces/product";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: IProduct[], args: string): IProduct[] {
    let search = [...products];
    if (args) {
      return search.filter(product => product.productTitle.toLowerCase().search(args.toLowerCase()) !== -1).slice()
    }
    return products.slice();
  }
}
