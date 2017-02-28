import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import {Location} from '@angular/common';
import { Config } from '../common/config';

import { SquareCharge } from './purchase';
import { SquareMoney } from './purchase';
import { SquareAddress } from './purchase';
import { ProductInfo } from './purchase';
import { User } from '../user/user';

import { PurchaseService }   from './purchase.service';
import { LoginService }   from '../login/login.service';


@Component({
	moduleId: module.id,
	selector: 'my-purchase-result',
	templateUrl: 'purchase-result.component.html',
	styleUrls: [ 'purchase-result.component.css' ]
})

export class PurchaseResultComponent implements OnInit {

	status: string;
	message: string;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private purchaseService: PurchaseService
		) {
		if(this.purchaseService.serviceHelper.isRefresh){
			this.router.navigate(['']);
		}else{
			let pathArray = this.router.url.split('/');
	  		if(pathArray.length < 4){
	  			this.router.navigate(['']);
	  		}
	  		this.status = pathArray[3];
			this.message = this.purchaseService.serviceHelper.result;
			this.purchaseService.serviceHelper.isRefresh = true;
		}
	}
	ngOnInit() {

	}
}
