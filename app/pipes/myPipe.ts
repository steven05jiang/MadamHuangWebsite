import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../article/article';

@Pipe({
  name: 'idDscd'
})
export class IdDscdPipe implements PipeTransform{
  transform(array: any, args: string): any {
  	//console.log(array.length);
    array.sort((a: any, b: any) => {
      if (a.id < b.id) {
        return 1;
      } else if (a.id > b.id) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}