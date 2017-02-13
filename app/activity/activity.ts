import { Article } from '../article/article';

export class Activity {
  id:               number;
  title:         string;
  description:      string;
  imageLink:	string;
  createdDate:        string;
  startDate:        string;
  endDate:        string;
  price:	number;
  article: Article;

  constructor() {
    this.id = -1;
    this.createdDate = (new Date().getTime()).toString();
  }
}
