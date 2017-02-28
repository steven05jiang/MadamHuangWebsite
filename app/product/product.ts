import { Article } from '../article/article';

export class Product {
  id:               number;
  title:         string;
  description:      string;
  imageLink:	string;
  price:	number;
  detail: string;
  articleId: number;

  constructor() {
    this.id = -1;
  }
}
