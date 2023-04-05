import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(products: IProduct[], category: string): IProduct[] | undefined {
    if (products) {
      return products.filter((product) => {
        if (category === 'All goods') {
          return products;
        } else {
          return (
            product.productCategory.productCategoryName.toLowerCase() ===
            category.toLowerCase()
          );
        }
      });
    }
    return products;
  }
}
