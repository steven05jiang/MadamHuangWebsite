import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Config } from '../common/config';

import { SquareCharge } from './purchase';
import { SquareMoney } from './purchase';
import { SquareAddress } from './purchase';
import { ProductInfo } from './purchase';
import { User } from '../user/user';
import { Product } from '../product/product';
import { Activity } from '../activity/activity';

import { PurchaseService }   from './purchase.service';
import { LoginService }   from '../login/login.service';
import { ActivityService }   from '../activity/activity.service';
import { ProductService }   from '../product/product.service';

@Component({
    moduleId: module.id,
    selector: 'my-purchase',
    templateUrl: 'purchase.component.html',
    styleUrls: [ 'purchase.component.css' ]
})

export class PurchaseComponent implements OnInit {

	subscription: any;

	applicationId = Config.applicationId;
	paymentForm: any;
	purchaseObject: any;
	purchaseCategory: string;
	purchaseId: number;

	productInfo: ProductInfo;
	squareCharge: SquareCharge;
	user: User;
	paymentHelper: any;

	@ViewChild('cardNonce') nonce: ElementRef;
	@ViewChild('cardBrand') cardBrand: ElementRef;
	@ViewChild('last4') cardFour: ElementRef;
	@ViewChild('expMonth') cardMonth: ElementRef;
	@ViewChild('expYear') cardYear: ElementRef;
	@ViewChild('billingPostalCode') cardPostCode: ElementRef;
	@ViewChild('detailContainer') detailContainer: ElementRef;

  	constructor(
  		private router: Router,
		private activatedRoute: ActivatedRoute,
		private purchaseService: PurchaseService,
		private loginService: LoginService,
		private activityService: ActivityService,
		private productService: ProductService
		) {
  		this.paymentHelper = {};

  		this.subscription = this.loginService.getStatusChangeEmitter()
      	.subscribe(($event:any) => {
      		this.user = $event.user;
      	});
		this.user = this.loginService.user;
      	if(this.user){
      		this.loginService.refreshToken(Config.getToken());
      	}
	}

	ngOnInit(): void {
		this.getPurchaseObject();
		this.initPaymentForm();
	}

	getPurchaseObject(){
  		if(this.purchaseService.serviceHelper.isRefresh){
	  		let pathArray = this.router.url.split('/');
	  		if(pathArray.length < 4){
	  			this.router.navigate(['']);
	  		}
	  		this.purchaseCategory = pathArray[2];
	  		this.purchaseId = parseInt(pathArray[3]);
	  		
	  		//Get purchase object and Init product info
	  		this.productInfo = new ProductInfo();
	  		//Init depends on category
	  		if(this.purchaseCategory === 'product'){
				this.productService.getObject(this.purchaseId).then(
	  				response => {
	  					if(response != null){
	  						this.purchaseObject = response as Product;
	  						this.productInfo.note = 'Purchase product: '+this.purchaseObject.title;
		  					this.productInfo.productCategory = 1;
		  					this.detailContainer.nativeElement.innerHTML = this.purchaseObject.detail;
	  					}else{
	  						this.router.navigate(['']);
	  					}
	  					
	  				}
	  			);

	  		}else if(this.purchaseCategory === 'activity'){
	  			this.activityService.getObject(this.purchaseId).then(
	  				response => {
	  					if(response != null){
	  						this.purchaseObject = response as Activity;
	  						this.productInfo.note = 'Pay for activity: '+this.purchaseObject.title;
		  					this.productInfo.productCategory = 2;
	  					}else{
	  						this.router.navigate(['']);
	  					}
	  					
	  				}
	  			);
	  			if(this.user == null || this.user.isMember == false){
	  				this.productInfo.memberQuantity = 0;
	  			}else{
	  				this.productInfo.memberQuantity = 1;
	  			}
	  		}
	  		this.productInfo.productId = this.purchaseId;
	  		this.productInfo.baseQuantity = 0;
	  		


	  		this.squareCharge = new SquareCharge();
	  		this.squareCharge.billing_address = new SquareAddress();
	  		this.squareCharge.shipping_address = new SquareAddress();
	  		this.squareCharge.buyer_email_address = null;
	  	}else{
	  		this.purchaseObject = this.purchaseService.serviceHelper.purchaseObject;
	  		this.squareCharge = this.purchaseService.serviceHelper.squareCharge;
	  		this.productInfo = this.purchaseService.serviceHelper.productInfo;
	  		this.paymentHelper.receiverName = this.purchaseService.serviceHelper.receiverName;
	  		this.purchaseCategory = this.purchaseService.serviceHelper.purchaseCategory;
	  		this.purchaseService.serviceHelper.isRefresh = true;
	  	}
	}

	initPaymentForm(){
		this.paymentForm = new SqPaymentForm({
	    applicationId: this.applicationId,
	    inputClass: 'sq-input',
	    inputStyles: [
	      {
	        fontSize: '15px'
	      }
	    ],
	    cardNumber: {
	      elementId: 'sq-card-number',
	      placeholder: '•••• •••• •••• ••••'
	    },
	    cvv: {
	      elementId: 'sq-cvv',
	      placeholder: 'CVV'
	    },
	    expirationDate: {
	      elementId: 'sq-expiration-date',
	      placeholder: 'MM/YY'
	    },
	    postalCode: {
	      elementId: 'sq-postal-code',
	      placeholder: 'Enter Zipcode here'
	    },
	    callbacks: {

	      // Called when the SqPaymentForm completes a request to generate a card
	      // nonce, even if the request failed because of an error.
	      cardNonceResponseReceived(errors: any, nonce: any, cardData: any) {
	        if (errors) {
	          console.log("Encountered errors:");

	          // This logs all errors encountered during nonce generation to the
	          // Javascript //console.
	          alert(errors[0].message);
	          errors.forEach((error:any) => {
	           console.log('  ' + error.message);
	          });
	        } else {
	          document.getElementById('card-nonce').value = nonce;
	          document.getElementById('card-brand').value = cardData.card_brand;
	          document.getElementById('last-4').value = cardData.last_4;
	          document.getElementById('exp-month').value = cardData.exp_month;
	          document.getElementById('exp-year').value = cardData.exp_year;
	          document.getElementById('billing-postal-code').value = cardData.billing_postal_code;
	          document.getElementById('submitButton').click();

	    	}
	      }

	      ,

	      unsupportedBrowserDetected() {
	        // Fill in this callback to alert buyers when their browser is not supported.
	      },

	      // Fill in these cases to respond to various events that can occur while a
	      // buyer is using the payment form.
	      inputEventReceived(inputEvent:any) {
	        switch (inputEvent.eventType) {
	          case 'focusClassAdded':
	            // Handle as desired
	            break;
	          case 'focusClassRemoved':
	            // Handle as desired
	            break;
	          case 'errorClassAdded':
	            // Handle as desired
	            break;
	          case 'errorClassRemoved':
	            // Handle as desired
	            break;
	          case 'cardBrandChanged':
	            // Handle as desired
	            break;
	          case 'postalCodeChanged':
	            // Handle as desired
	            break;
	        }
	      },

	      paymentFormLoaded() {
	        // Fill in this callback to perform actions after the payment form is
	        // done loading (such as setting the postal code field programmatically).
	        // paymentForm.setPostalCode('94103');
	      }
	    }
	  });
		this.paymentForm.build();
	}

	ngOnDestroy() {
	    this.paymentForm.destroy();
	    this.subscription.unsubscribe();
	  }

	assembleCharge(){
		let squareMoney = new SquareMoney();
		squareMoney.amount = this.productInfo.baseQuantity * this.purchaseObject.price;
		if(this.purchaseCategory == 'activity'){
			squareMoney.amount = squareMoney.amount + this.productInfo.memberQuantity * this.purchaseObject.memberPrice;
		}
		this.purchaseService.serviceHelper.preTaxNFeeTotalPrice = squareMoney.amount;
		//Add tax
		squareMoney.amount = Math.round(1.0625*squareMoney.amount);
		//Add transaction fee
		squareMoney.amount = Math.round((squareMoney.amount+30)/0.971);
		this.squareCharge.amount_money = squareMoney;
		this.squareCharge.card_nonce = this.nonce.nativeElement.value;
		if(this.purchaseCategory == 'activity'){
			this.squareCharge.note = 'A:';
		}else{
			this.squareCharge.note = 'P:';
		}
		this.squareCharge.note = this.squareCharge.note+this.purchaseObject.title+",ID:"+this.purchaseObject.id+",BQ:"+this.productInfo.baseQuantity+",MQ:"+this.productInfo.memberQuantity+",NM:"+this.paymentHelper.receiverName;
	}	

	isValidForm(): boolean{
		if(this.productInfo.baseQuantity < 0){
	      	alert("Quantity should be more than 0.");
	      	return false;
      	}
      	if(this.purchaseCategory == 'product' && this.productInfo.baseQuantity == 0){
      		alert("Quantity should be more than 0.");
	      	return false;
      	}
      	if(this.purchaseCategory == 'activity'){
      		if(this.productInfo.baseQuantity == 0 && this.productInfo.memberQuantity == 0){
      			alert("Please select an item to purchase.");
	      		return false;
      		}else if(this.productInfo.memberQuantity < 0){
      			alert("Member Quantity should be more than 0.");
      			return false;
      		}else if(!this.user.isMember && this.productInfo.memberQuantity > 0){
	      		alert("Member price is required membership.");
		      	return false;
	      	}
      	}
      	return true;
	}

	onSubmit(){
      this.assembleCharge();
      if(!this.isValidForm()){
      	return;
      }
      this.purchaseService.serviceHelper.squareCharge =	this.squareCharge;
	  this.purchaseService.serviceHelper.productInfo = 	this.productInfo;
	  this.purchaseService.serviceHelper.receiverName = this.paymentHelper.receiverName;
	  this.purchaseService.serviceHelper.purchaseObject = this.purchaseObject;
	  this.purchaseService.serviceHelper.purchaseCategory = this.purchaseCategory;
	  //For card data
	  this.purchaseService.serviceHelper.cardData.cardBrand = this.cardBrand.nativeElement.value;
	  this.purchaseService.serviceHelper.cardData.cardFour = this.cardFour.nativeElement.value;
	  this.purchaseService.serviceHelper.cardData.cardMonth = this.cardMonth.nativeElement.value;
	  this.purchaseService.serviceHelper.cardData.cardYear = this.cardYear.nativeElement.value;
	  this.purchaseService.serviceHelper.cardData.cardPostCode = this.cardPostCode.nativeElement.value;
	  this.purchaseService.serviceHelper.isRefresh = false;
      this.router.navigate(['purchase/confirmation']);
	} 

	putMyAddr(){
		if(this.user){
			//console.log("Start copy");
			this.squareCharge.shipping_address.address_line_1 = this.user.addressLine1;
			this.squareCharge.shipping_address.address_line_2 = this.user.addressLine2;
			this.squareCharge.shipping_address.locality = this.user.city;
			this.squareCharge.shipping_address.administrative_district_level_1 = this.user.state;
			this.squareCharge.shipping_address.postal_code = this.user.zipCode;
			this.squareCharge.shipping_address.country = this.user.country;
		}else{
			this.router.navigate(['login']);
		}
	}    

	putMyEmail(){
		if(this.user){
			this.squareCharge.buyer_email_address = this.user.email;
		}else{
			this.router.navigate(['login']);
		}
	} 

	copyShipAddrToBillAddr(){
		//assign copy all attrs. But nested object will only be copied reference
		this.squareCharge.billing_address = Object.assign({},this.squareCharge.shipping_address);
	}

	parsePrice(price: any){
		return parseFloat(price)/100;
	}



	// This function is called when a buyer clicks the Submit button on the webpage
  // to charge their card.
  	requestCardNonce(event:any) {
    //event.preventDefault();

    this.paymentForm.requestCardNonce();
  }
}
