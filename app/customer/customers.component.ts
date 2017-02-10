import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Config, Text } from '../common/config';
import { Event } from '../common/event';

import { Customer } from './customer';
import { CustomerDetailComponent } from './customer-detail.component';

import { CustomerService } from './customer.service';
import { APIResponse } from '../common/api-response';

@Component({
    moduleId: module.id,
    selector: 'my-customers',
    templateUrl: 'customers.component.html',
    styleUrls: [ 'customers.component.css' ]
})

export class CustomersComponent implements OnInit {

  apiResponse: APIResponse;
  objects: Customer[];
  selectedObject: Customer;
  page: number;
  size: number = Config.PAGE_NUM;
  message: string;
  subscription: any;

  constructor(
    private router: Router,
    private service: CustomerService
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

  getObjects(page: number, size: number): void {
    this.service.getObjects(page, size).then(
      apiResponse => {
        this.apiResponse = apiResponse;
        this.objects = apiResponse.body as Customer[];
      }
    );
  }

  ngOnInit(): void {
    this.getObjects(0, Config.PAGE_NUM);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelect(object: Customer): void {
    this.selectedObject = object;
  }

  gotoDetail(): void {
    this.router.navigate(['/customer-detail', this.selectedObject.id]);
  }

  gotoEdit(): void {
    this.router.navigate(['/customer-edit', this.selectedObject.id]);
  }

  view(object: Customer): void {
    this.onSelect(object);
    this.router.navigate(['/customer-detail', this.selectedObject.id]);
  }

  edit(object: Customer): void {
    this.onSelect(object);
    this.router.navigate(['/customer-edit', this.selectedObject.id]);
  }

  delete(object: Customer): void {
    if(confirm('are you sure?')) {
        this.onSelect(object);
        this.service.delete(this.selectedObject);
        //this.router.navigate(['/wechats']);
        //this.ngOnInit();
      }
    //}
  }

  add(): void {
    this.router.navigate(['/customer-edit', -1]);
  }

  selectObjects(event: any) {
    //alert("page change");
    //this.page = this.paginationComponent.page; // pass parameter from service (triggered by pageChange Event)
    //this.size = this.paginationComponent.size;
    this.getObjects(event.page, event.size);
  }

  invoices(obj: Customer): void {
    this.onSelect(obj);
    // passing customer id
    this.router.navigate(['/invoices', this.selectedObject.id]);
  }

  invoiceAdd(obj: Customer): void {
    this.onSelect(obj);
    // passing new invoice id (-1) and customer id
    this.router.navigate(['/invoice-edit', -1, this.selectedObject.id]);
  }

}
