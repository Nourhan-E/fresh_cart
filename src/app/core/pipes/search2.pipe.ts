import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interfaces/product';

@Pipe({
  name: 'search2',
  standalone: true
})
export class Search2Pipe implements PipeTransform {

  transform(products:product[],term:string ): any {
    return   products.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase()))
      }

}
