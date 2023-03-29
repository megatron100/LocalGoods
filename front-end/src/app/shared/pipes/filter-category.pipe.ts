import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core';

@Pipe({
  name: 'sort',
})
export class FilterCategoryPipe implements PipeTransform {
  transform(products: IProduct[], args: string): IProduct[] {
    const search = [...products];
    if (args === '') {
      return products.slice();
    } else {
      return search
        .filter((product) => product.category?.search(args) !== -1)
        .slice();
    }
  }
}
