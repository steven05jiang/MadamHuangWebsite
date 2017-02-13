import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { APIResponse } from '../common/api-response';

import { User } from './user';
import { LoginService }          from '../login/login.service';

@Component({
	moduleId: module.id,
	selector: 'my-user-profile',
	templateUrl: 'user-profile.component.html',
	styleUrls: [ 'user-profile.component.css' ]
})

export class UserProfileComponent implements OnInit {
	user: User;
	subscription: any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private loginService:LoginService
		) {
    this.user = this.loginService.user;
    this.subscription = this.loginService.getStatusChangeEmitter()
      .subscribe(($event:any) => {
        if($event.user) {
          this.user = $event.user;
          }else{
            this.user = null;
          }
          // TODO: message is not used for now.
          //this.message = $event.message;
    } );
	}
	ngOnInit(): void {
	}

}
