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
	selector: 'my-purchase-confirm',
	templateUrl: 'purchase-confirm.component.html',
	styleUrls: [ 'purchase-confirm.component.css' ]
})

export class PurchaseConfirmationComponent implements OnInit {

	productInfo: ProductInfo;
	squareCharge: SquareCharge;
	user: User;
	paymentHelper: any;
	purchaseObject: any;
	purchaseCategory: string;

	subscription: any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private location: Location,
		private purchaseService: PurchaseService,
		private loginService:LoginService
		) {
			this.paymentHelper = {};
			this.paymentHelper.isWaiting = false;
			if(this.purchaseService.serviceHelper.isRefresh){
				this.router.navigate(['']);
			}else{
				this.purchaseObject = this.purchaseService.serviceHelper.purchaseObject;
		  		this.squareCharge = this.purchaseService.serviceHelper.squareCharge;
		  		this.productInfo = this.purchaseService.serviceHelper.productInfo;
		  		this.paymentHelper.receiverName = this.purchaseService.serviceHelper.receiverName;
		  		this.paymentHelper.cardData = this.purchaseService.serviceHelper.cardData
		  		this.paymentHelper.preTaxNFeeTotalPrice = this.purchaseService.serviceHelper.preTaxNFeeTotalPrice;
		  		this.paymentHelper.preFeeTotalPrice = Math.round(this.paymentHelper.preTaxNFeeTotalPrice*1.0625);
		  		this.purchaseCategory = this.purchaseService.serviceHelper.purchaseCategory;
		  		this.purchaseService.serviceHelper.isRefresh = true;
			}
			this.user = this.loginService.user;
			this.subscription = this.loginService.getStatusChangeEmitter()
      			.subscribe(($event:any) => {
      				this.router.navigate(['']);
      			});

	}
	ngOnInit() {
	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
  	}

  	onSubmit(){
  	this.paymentHelper.isWaiting = true;
  	this.purchaseService.sendPurchase(this.squareCharge, this.productInfo).then(
      	response => {
      		this.purchaseService.serviceHelper.result.message = response.message;
      		this.purchaseService.serviceHelper.isRefresh = false;
      		if(response.code == '200'){
      			this.purchaseService.serviceHelper.result.invoice = response.body;
      			this.router.navigate(['purchase/result/success']);
      		}else if(response.code == '510'){
      			this.router.navigate(['purchase/result/error']);
      		}else{
      			this.router.navigate(['purchase/result/fail']);
      		}
      });
  	}

  	parsePrice(price: any){
  		price = Math.round(price);
		return parseFloat(price)/100;
	}

  	onModify(){
  		this.purchaseService.serviceHelper.isRefresh = false;
  		this.location.back();
  	}

}
