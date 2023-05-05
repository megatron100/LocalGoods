import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: IProduct[], args: string): IProduct[] {
    const search = [...products];
    if (args) {
      return search
        .filter(
          (product) =>
            product.productTitle.toLowerCase().search(args.toLowerCase()) !== -1
        )
        .slice();
    }
    return products.slice();
  }
}
