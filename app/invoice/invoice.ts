
import { Customer } from '../customer/customer';


export class Invoice {
  id:               number;
  customer:         Customer;
  invoiceItems:     InvoiceItem[];
  invoiceDate:      string;
  description:      string;
  createdOn:        string;
  updatedOn:        string;
  agent: string;
  creator: string;
  updator: string;
  total: number;

  constructor() {

    this.id = -1;
    this.customer = new Customer();
    this.createdOn = (new Date().getTime()).toString();
    this.updatedOn = (new Date().getTime()).toString();
  }
}

export class InvoiceItem {
  invoiceId:    number;
  itemId:       number;
  name:         string;
  description:  string;
  price:        number;

  constructor() {
    this.invoiceId = -1;
    this.itemId = -1;
    this.name = '';
    this.description = '';
    this.price = 0.00;
  }
}
