import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { APIResponse } from '../common/api-response';

import { User } from './user';
import { LoginService }          from '../login/login.service';
import { ProductInfo } from '../purchase/purchase'

import { UserService } from './user.service';


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

	invoices: ProductInfo[];
	invoiceHelper: any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private loginService:LoginService,
		private userService: UserService
		) {
			this.invoiceHelper = {};
		  	this.invoiceHelper.invoiceSize = 10;
		  	this.invoiceHelper.invoicePage = 0;
		  	this.invoiceHelper.invoiceTotalPage = 1;
		  	this.invoiceHelper.invoiceMessage = '';
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

  	getMyInvoices(page: number){
		if(page < 0 || (this.invoiceHelper.invoiceTotalPage != null && page >= this.invoiceHelper.invoiceTotalPage)){
			alert('No more invoices.');
			return;
		}
		this.userService.getMyInvoices(page, this.invoiceHelper.invoiceSize).then(
  			response => {
  				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.invoiceHelper.invoicePage = page;
					this.invoiceHelper.invoiceTotalPage = response.totalPages;
					this.invoices = response.body as ProductInfo[];
				}else{
					this.invoiceHelper.invoiceMessage = response.message;
				}

  		});
	}

	parsePrice(price: any){
  		price = Math.round(price);
		return parseFloat(price)/100;
	}

}
