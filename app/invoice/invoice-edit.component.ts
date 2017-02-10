import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Invoice, InvoiceItem }                 from './invoice';
import { InvoiceService }          from './invoice.service';
import { Customer }                 from '../customer/customer';
import { CustomerService }                 from '../customer/customer.service';
import { Country, State }        from '../lookup/lookup';
import { COUNTRIES, STATES }        from '../lookup/lookup-data';

@Component({
  moduleId: module.id,
  selector: 'my-invoice-edit',
  templateUrl: 'invoice-edit.component.html',
  styleUrls: [ 'invoice-edit.component.css' ]
})

export class InvoiceEditComponent implements OnInit {

  object: Invoice;
  countries: Country[] = COUNTRIES;
  message: string;
  subscription: any;

  myDatePickerOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '260px',
    inline: false,
    disableUntil: {year: 2016, month: 1, day: 1},
    selectionTxtFontSize: '16px'
  };

  constructor(
    private service: InvoiceService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  this.message = this.service.message;
  this.subscription = this.service.getStatusChangeEmitter()
  .subscribe(($event:any) => {
    if($event.object) {
      // do nothing - reserved for future
      //this.user = $event.user;
    }
      this.message = $event.message;
  } );
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      let customerId = +params['customer_id'];
      console.log('======> id: ' + id + ' customer id: ' + customerId);
      if(id == -1) {
        // important: we only care about customer id when it is a new record
        // for existing record, we don't change customer id value
        this.object = new Invoice();
        this.customerService.getObject(customerId).then(customer => this.object.customer = customer);
        //this.object.customer.id = customerId;
      } else {
        this.service.getObject(id).then(object => this.object = object);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save(): void {
    this.service.update(this.object)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  addItem(): void {
    if(this.object.invoiceItems==null)
      this.object.invoiceItems = new Array<InvoiceItem>();

    let items:InvoiceItem[] = this.object.invoiceItems;
    let item:InvoiceItem = new InvoiceItem();
    item.invoiceId = this.object.id;
    item.itemId = items.length + 1; // index start from 1.
    items.push(item);
    this.object.invoiceItems = items;
  }

  removeItem(object: InvoiceItem): void {
    if(this.object.invoiceItems==null)
      this.object.invoiceItems = new Array<InvoiceItem>();

    this.object.invoiceItems.splice(this.object.invoiceItems.indexOf(object), 1);

  }

  onInvoiceDateChanged(event: any){
    this.object.invoiceDate = event.formatted;
  }

}
