export class Activity {
  id:               number;
  title:         string;
  description:      string;
  imageLink:	string;
  createdDate:        Date;
  startDate:        Date;
  endDate:        Date;
  price:	number;
  memberPrice: number;
  articleId: number;

  constructor() {
    this.id = -1;
    //this.createdDate = (new Date().getTime()).toString();
  }
}
