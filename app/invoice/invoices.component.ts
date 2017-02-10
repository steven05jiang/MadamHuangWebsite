import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { APIResponse } from '../common/api-response';

import { Invoice, InvoiceItem } from './invoice';
import { InvoiceDetailComponent } from './invoice-detail.component';
import { InvoiceService } from './invoice.service';

import { Customer }                 from '../customer/customer';
import { CustomerService }                 from '../customer/customer.service';

@Component({
    moduleId: module.id,
    selector: 'my-users',
    templateUrl: 'invoices.component.html',
    styleUrls: [ 'invoices.component.css' ]
})

export class InvoicesComponent implements OnInit {

  objects: Invoice[];
  selectedObject: Invoice;
  message: string;
  subscription: any;

  apiResponse: APIResponse;
  page: number;
  size: number;
  customerId: number;
  customer: Customer;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: InvoiceService,
    private customerService: CustomerService
  ) {
  this.message = this.service.message;
  this.subscription = this.service.getStatusChangeEmitter()
    .subscribe(($event:any) => {
      if($event.object instanceof Event && $event.object.type == Event.RELOAD) {
        // do nothing - reserved for future
        //this.user = $event.user;
        this.ngOnInit();
      }
        this.message = $event.message;
    } );
  }


  getObjects(page: number, size: number, customerId: number): void {

    this.customerId = customerId;
    this.service.getObjects(page, size, customerId).then(
      apiResponse => {
        this.apiResponse = apiResponse;
        this.objects = apiResponse.body as Invoice[];
      }
    );
    this.customerService.getObject(customerId).then(customer => this.customer = customer);
  }

  ngOnInit(): void {
    // getting parameter from route (as customer_id)
    this.activatedRoute.params.forEach((params: Params) => {

        let customerId = +params['customer_id'];

        console.log('customerId: ' + customerId);
        //this.service.getObject(id).then(object => this.object = object);
        // TODO: we load invoices for this customer
        this.getObjects(0, Config.PAGE_NUM, customerId);

        this.customerService.getObject(customerId).then(customer => this.customer = customer);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelect(object: Invoice): void {
    this.selectedObject = object;
  }

  gotoDetail(): void {
    this.router.navigate(['/invoice-detail', this.selectedObject.id]);
  }

  gotoEdit(): void {
    this.router.navigate(['/invoice-edit', this.selectedObject.id, -1]);
    //this.router.navigate(['/invoice-edit', {id: this.selectedObject.id}]);
  }

  view(object: Invoice): void {
    this.onSelect(object);
    this.router.navigate(['/invoice-detail', this.selectedObject.id]);
  }

  edit(object: Invoice): void {
    this.onSelect(object);
    this.router.navigate(['/invoice-edit', this.selectedObject.id, -1]);
    //this.router.navigate(['/invoice-edit', {id: this.selectedObject.id}]);
  }

  add(): void {
    this.router.navigate(['/invoice-edit', -1, this.selectedObject.customer.id]);
  }

  delete(object: Invoice): void {
    console.log('in delete');
    if(confirm('are you sure?')) {
      this.onSelect(object);
      this.service.delete(this.selectedObject);
    }
  }

  selectObjects(event: any) {
    this.getObjects(event.page, event.size, this.customerId);
  }

  invoiceAdd(obj: Customer): void {
    // passing new invoice id (-1) and customer id
    this.router.navigate(['/invoice-edit', -1, obj.id]);
  }
}
