import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../article/article';

@Pipe({
  name: 'dateDscd'
})
export class ArticleIdPipe implements PipeTransform{
  transform(array: Article[], args: string): Article[] {
  	console.log(array.length);
    array.sort((a: Article, b: Article) => {
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