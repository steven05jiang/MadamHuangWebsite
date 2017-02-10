import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { User }                 from './user';
import { UserService }          from './user.service';
import { Country, State }        from '../lookup/lookup';
import { COUNTRIES, STATES }        from '../lookup/lookup-data';

@Component({
  moduleId: module.id,
  selector: 'my-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: [ 'user-edit.component.css' ]
})

export class UserEditComponent implements OnInit {

  object: User;
  countries: Country[] = COUNTRIES;
  message: string;
  subscription: any;

  constructor(
    private service: UserService,
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

      console.log('id: ' + id);
      if(id == -1) {
        this.object = new User();
      } else {
        this.service.getObject(id).then(object => this.object = object);
      }
    })
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

}
