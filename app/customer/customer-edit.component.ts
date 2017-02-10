import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router}   from '@angular/router';
import { Location }                 from '@angular/common';

import { Customer }                 from './customer';
import { CustomerService }          from './customer.service';
import { Country, State }        from '../lookup/lookup';
import { COUNTRIES, STATES }        from '../lookup/lookup-data';

@Component({
  moduleId: module.id,
  selector: 'my-customer-edit',
  templateUrl: 'customer-edit.component.html',
  styleUrls: [ 'customer-edit.component.css' ]
})

export class CustomerEditComponent implements OnInit {

  object: Customer;
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
    disableUntil: {year: 1900, month: 1, day: 1},
    selectionTxtFontSize: '16px'
  };

  constructor(
    private service: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
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

      console.log('id: ' + id);
      if(id == -1) {
        this.object = new Customer();
      } else {
        this.service.getObject(id).then(object => this.object = object);
      }
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  save(): void{
    if(this.object.id == -1){
      this.service.add(this.object)
      .then(() => {
        this.router.navigate(['customers']);
        });
    }else{
      this.service.update(this.object)
      .then(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  onBirthdayChanged(event:any) {
    this.object.birthday = event.formatted;
  }

  onpIssuedDateChanged(event:any) {
    this.object.pIssueDate = event.formatted;
  }

  onpExpDateChanged(event:any) {
    this.object.pExpDate = event.formatted;
  }

}
