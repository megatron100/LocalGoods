import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(products: IProduct[], ...args: number[]): IProduct[] {
    if (products) {
      const arr = [...products];
      const page = args[0] * args[1];
      return arr.splice(page, args[1]);
    }
    return products;
  }
}
