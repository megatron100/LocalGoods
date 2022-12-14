import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], category: string): any[] {
    // if (category) {
    //   return products.filter((prouct) => {
    //     return prouct.category === category
    //   })
    // }
  
    return products.filter((product) => {
      return product.category === category
    })
  }

  

}
