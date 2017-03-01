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
	defaultImage = 'image/loading.png';

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private loginService:LoginService
		) {
	this.subscription = this.loginService.getStatusChangeEmitter()
      .subscribe(($event:any) => {
        if($event.user) {
          this.user = $event.user;
          }else{
          	this.router.navigate(['login']);
          }
          // TODO: message is not used for now.
          //this.message = $event.message;
    } );
    this.user = this.loginService.user;
    if(!this.user){
    	this.router.navigate(['login']);
    }else{
    	if(!this.user.imageLink){
	    	this.user.imageLink = Config.user_header_folder+'/book.jpg';
	    }
    	this.loginService.refreshToken(Config.getToken());
    }

	}
	ngOnInit(): void {
		$(() => {
		  $('[data-toggle="tooltip"]').tooltip();
		  //$('.tooltip-arrow').css('background', 'rgb(138,0,35)');
		  //$('[data-toggle="tooltip"]').hover(()=>{
		    //$('.tooltip-inner').css('background', 'rgb(138,0,35)');
		    //$('.tooltip.top-right .tooltip-arrow').css('background', 'rgb(138,0,35)');
			//});
		});
	}

	ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
