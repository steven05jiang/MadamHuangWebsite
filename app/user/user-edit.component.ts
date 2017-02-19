import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { APIResponse } from '../common/api-response';

import { User } from './user';
import { LoginService }          from '../login/login.service';
import { USER_IMAGE } from './user-image'

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
	defaultImage = 'image/loading.png';
	headImages: string[];
	selectedImage: string;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private loginService:LoginService
		) {
	this.headImages = USER_IMAGE;
    this.user = this.loginService.user;
    this.updatedUser=Object.assign({},this.user);
    if(!this.updatedUser.imageLink){
    	this.updatedUser.imageLink = Config.user_header_folder+'/book.jpg';
    }
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

	selectImage(imageLink: string){
		this.selectedImage = imageLink;
	}

	onSaveImage() {
		this.updatedUser.imageLink = this.selectedImage;
	}

	  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
