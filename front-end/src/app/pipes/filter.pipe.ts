import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], category: string): any[] {
    return products.filter((product) => {
      console.log(products);
      
      return product.productCategory.productCategoryName.toLowerCase() === category.toLowerCase()
    })
  }

  

}
