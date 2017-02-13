import { Article } from '../article/article';

export class Product {
  id:               number;
  title:         string;
  description:      string;
  imageLink:	string;
  price:	number;
  article: Article;

  constructor() {
    this.id = -1;
  }
}
