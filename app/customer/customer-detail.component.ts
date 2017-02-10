import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Customer }                 from './customer';
import { CustomerService }          from './customer.service';

@Component({
  moduleId: module.id,
  selector: 'my-customer-detail',
  templateUrl: 'customer-detail.component.html',
  styleUrls: [ 'customer-detail.component.css' ]
})

export class CustomerDetailComponent implements OnInit {

  object: Customer;
  message: string;
  subscription: any;

  constructor(
    private router: Router,
    private service: CustomerService,
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
      this.service.getObject(id)
        .then(object => this.object = object);
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  edit(): void {
    this.router.navigate(['/customer-edit', this.object.id]);
  }

  goBack(): void {
    this.location.back();
  }

}
