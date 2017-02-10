import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Invoice }                 from './invoice';
import { InvoiceService }          from './invoice.service';

@Component({
  moduleId: module.id,
  selector: 'my-invoice-detail',
  templateUrl: 'invoice-detail.component.html',
  styleUrls: [ 'invoice-detail.component.css' ]
})

export class InvoiceDetailComponent implements OnInit {

  object: Invoice;
  message: string;
  subscription: any;

  constructor(
    private router: Router,
    private service: InvoiceService,
    private route: ActivatedRoute,
    private location: Location,
    private window: Window
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
      console.log("Got id ------: " + id);

      this.service.getObject(id)
        .then(object => this.object = object);
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  edit(): void {
    this.router.navigate(['/invoice-edit', this.object.id, -1]);
  }

  goBack(): void {
    this.location.back();
  }

  print(): void {
    this.window.print();
  }

  send(): void{
    this.window.location.href = "mailto:"+this.object.customer.email+"?subject=Invoice%20From%20Gallop%20Global&body=message%20goes%20here%0D%0AHello%20World.";
  }

}
