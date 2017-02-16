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
	selector: 'my-user-edit',
	templateUrl: 'user-edit.component.html',
	styleUrls: [ 'user-edit.component.css' ]
})

export class UserEditComponent implements OnInit {
	user: User;
	updatedUser: User;
	subscription: any;
	message: string;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private loginService:LoginService
		) {
    this.user = this.loginService.user;
    this.updatedUser=Object.assign({},this.user);
    this.subscription = this.loginService.getStatusChangeEmitter()
      .subscribe(($event:any) => {
        if($event.user) {
          	this.user = $event.user;
          }else{
          	this.router.navigate(['login']);
            this.user = null;
          }
          // TODO: message is not used for now.
          this.message = $event.message;
    } );
	}
	ngOnInit(): void {
	}

	clearMessage() {
    	this.message = '';
  	}

  	onSubmit(): void{
  		this.clearMessage();
		this.loginService.updateProfile(this.updatedUser).then(
				user => this.router.navigate(['/profile'])
			);
  	}
	onCancel(): void {
		this.router.navigate(['/profile']);
	}

	  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
