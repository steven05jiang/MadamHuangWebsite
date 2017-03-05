"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var config_1 = require("../common/config");
var purchase_1 = require("./purchase");
var purchase_2 = require("./purchase");
var purchase_3 = require("./purchase");
var purchase_4 = require("./purchase");
var purchase_service_1 = require("./purchase.service");
var login_service_1 = require("../login/login.service");
var activity_service_1 = require("../activity/activity.service");
var product_service_1 = require("../product/product.service");
var PurchaseComponent = (function () {
    function PurchaseComponent(router, activatedRoute, purchaseService, loginService, activityService, productService) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.purchaseService = purchaseService;
        this.loginService = loginService;
        this.activityService = activityService;
        this.productService = productService;
        this.applicationId = config_1.Config.applicationId;
        this.paymentHelper = {};
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            _this.user = $event.user;
        });
        this.user = this.loginService.user;
        if (this.user) {
            this.loginService.refreshToken(config_1.Config.getToken());
        }
    }
    PurchaseComponent.prototype.ngOnInit = function () {
        this.getPurchaseObject();
        this.initPaymentForm();
    };
    PurchaseComponent.prototype.getPurchaseObject = function () {
        var _this = this;
        if (this.purchaseService.serviceHelper.isRefresh) {
            var pathArray = this.router.url.split('/');
            if (pathArray.length < 4) {
                this.router.navigate(['']);
            }
            this.purchaseCategory = pathArray[2];
            this.purchaseId = parseInt(pathArray[3]);
            //Get purchase object and Init product info
            this.productInfo = new purchase_4.ProductInfo();
            //Init depends on category
            if (this.purchaseCategory === 'product') {
                this.productService.getObject(this.purchaseId).then(function (response) {
                    if (response != null) {
                        _this.purchaseObject = response;
                        _this.productInfo.note = 'Purchase product: ' + _this.purchaseObject.title;
                        _this.productInfo.productCategory = 1;
                        _this.detailContainer.nativeElement.innerHTML = _this.purchaseObject.detail;
                    }
                    else {
                        _this.router.navigate(['']);
                    }
                });
            }
            else if (this.purchaseCategory === 'activity') {
                this.activityService.getObject(this.purchaseId).then(function (response) {
                    if (response != null) {
                        _this.purchaseObject = response;
                        _this.productInfo.note = 'Pay for activity: ' + _this.purchaseObject.title;
                        _this.productInfo.productCategory = 2;
                    }
                    else {
                        _this.router.navigate(['']);
                    }
                });
                if (this.user == null || this.user.isMember == false) {
                    this.productInfo.memberQuantity = 0;
                }
                else {
                    this.productInfo.memberQuantity = 1;
                }
            }
            this.productInfo.productId = this.purchaseId;
            this.productInfo.baseQuantity = 0;
            this.squareCharge = new purchase_1.SquareCharge();
            this.squareCharge.billing_address = new purchase_3.SquareAddress();
            this.squareCharge.shipping_address = new purchase_3.SquareAddress();
            this.squareCharge.buyer_email_address = null;
        }
        else {
            this.purchaseObject = this.purchaseService.serviceHelper.purchaseObject;
            this.squareCharge = this.purchaseService.serviceHelper.squareCharge;
            this.productInfo = this.purchaseService.serviceHelper.productInfo;
            this.paymentHelper.receiverName = this.purchaseService.serviceHelper.receiverName;
            this.purchaseCategory = this.purchaseService.serviceHelper.purchaseCategory;
            this.purchaseService.serviceHelper.isRefresh = true;
        }
    };
    PurchaseComponent.prototype.initPaymentForm = function () {
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
                cardNonceResponseReceived: function (errors, nonce, cardData) {
                    if (errors) {
                        console.log("Encountered errors:");
                        // This logs all errors encountered during nonce generation to the
                        // Javascript //console.
                        alert(errors[0].message);
                        errors.forEach(function (error) {
                            console.log('  ' + error.message);
                        });
                    }
                    else {
                        document.getElementById('card-nonce').value = nonce;
                        document.getElementById('card-brand').value = cardData.card_brand;
                        document.getElementById('last-4').value = cardData.last_4;
                        document.getElementById('exp-month').value = cardData.exp_month;
                        document.getElementById('exp-year').value = cardData.exp_year;
                        document.getElementById('billing-postal-code').value = cardData.billing_postal_code;
                        document.getElementById('submitButton').click();
                    }
                },
                unsupportedBrowserDetected: function () {
                    // Fill in this callback to alert buyers when their browser is not supported.
                },
                // Fill in these cases to respond to various events that can occur while a
                // buyer is using the payment form.
                inputEventReceived: function (inputEvent) {
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
                paymentFormLoaded: function () {
                    // Fill in this callback to perform actions after the payment form is
                    // done loading (such as setting the postal code field programmatically).
                    // paymentForm.setPostalCode('94103');
                }
            }
        });
        this.paymentForm.build();
    };
    PurchaseComponent.prototype.ngOnDestroy = function () {
        this.paymentForm.destroy();
        this.subscription.unsubscribe();
    };
    PurchaseComponent.prototype.assembleCharge = function () {
        var squareMoney = new purchase_2.SquareMoney();
        squareMoney.amount = this.productInfo.baseQuantity * this.purchaseObject.price;
        if (this.purchaseCategory == 'activity') {
            squareMoney.amount = squareMoney.amount + this.productInfo.memberQuantity * this.purchaseObject.memberPrice;
        }
        this.purchaseService.serviceHelper.preTaxNFeeTotalPrice = squareMoney.amount;
        //Add tax
        squareMoney.amount = Math.round(1.0625 * squareMoney.amount);
        //Add transaction fee
        squareMoney.amount = Math.round((squareMoney.amount + 30) / 0.971);
        this.squareCharge.amount_money = squareMoney;
        this.squareCharge.card_nonce = this.nonce.nativeElement.value;
        if (this.purchaseCategory == 'activity') {
            this.squareCharge.note = 'A:';
        }
        else {
            this.squareCharge.note = 'P:';
        }
        this.squareCharge.note = this.squareCharge.note + this.purchaseObject.title + ",ID:" + this.purchaseObject.id + ",BQ:" + this.productInfo.baseQuantity + ",MQ:" + this.productInfo.memberQuantity + ",NM:" + this.paymentHelper.receiverName;
    };
    PurchaseComponent.prototype.isValidForm = function () {
        if (this.productInfo.baseQuantity < 0) {
            alert("Quantity should be more than 0.");
            return false;
        }
        if (this.purchaseCategory == 'product' && this.productInfo.baseQuantity == 0) {
            alert("Quantity should be more than 0.");
            return false;
        }
        if (this.purchaseCategory == 'activity') {
            if (this.productInfo.baseQuantity == 0 && this.productInfo.memberQuantity == 0) {
                alert("Please select an item to purchase.");
                return false;
            }
            else if (this.productInfo.memberQuantity < 0) {
                alert("Member Quantity should be more than 0.");
                return false;
            }
            else if (!this.user.isMember && this.productInfo.memberQuantity > 0) {
                alert("Member price is required membership.");
                return false;
            }
        }
        return true;
    };
    PurchaseComponent.prototype.assembleProductInfo = function () {
        this.productInfo.receiver = this.paymentHelper.receiverName;
        this.productInfo.email = this.squareCharge.buyer_email_address;
    };
    PurchaseComponent.prototype.onSubmit = function () {
        this.assembleCharge();
        this.assembleProductInfo();
        if (!this.isValidForm()) {
            return;
        }
        this.purchaseService.serviceHelper.squareCharge = this.squareCharge;
        this.purchaseService.serviceHelper.productInfo = this.productInfo;
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
    };
    PurchaseComponent.prototype.putMyAddr = function () {
        if (this.user) {
            //console.log("Start copy");
            this.squareCharge.shipping_address.address_line_1 = this.user.addressLine1;
            this.squareCharge.shipping_address.address_line_2 = this.user.addressLine2;
            this.squareCharge.shipping_address.locality = this.user.city;
            this.squareCharge.shipping_address.administrative_district_level_1 = this.user.state;
            this.squareCharge.shipping_address.postal_code = this.user.zipCode;
            this.squareCharge.shipping_address.country = this.user.country;
        }
        else {
            this.router.navigate(['login']);
        }
    };
    PurchaseComponent.prototype.putMyEmail = function () {
        if (this.user) {
            this.squareCharge.buyer_email_address = this.user.email;
        }
        else {
            this.router.navigate(['login']);
        }
    };
    PurchaseComponent.prototype.copyShipAddrToBillAddr = function () {
        //assign copy all attrs. But nested object will only be copied reference
        this.squareCharge.billing_address = Object.assign({}, this.squareCharge.shipping_address);
    };
    PurchaseComponent.prototype.parsePrice = function (price) {
        return parseFloat(price) / 100;
    };
    // This function is called when a buyer clicks the Submit button on the webpage
    // to charge their card.
    PurchaseComponent.prototype.requestCardNonce = function (event) {
        //event.preventDefault();
        this.paymentForm.requestCardNonce();
    };
    return PurchaseComponent;
}());
__decorate([
    core_1.ViewChild('cardNonce'),
    __metadata("design:type", core_1.ElementRef)
], PurchaseComponent.prototype, "nonce", void 0);
__decorate([
    core_1.ViewChild('cardBrand'),
    __metadata("design:type", core_1.ElementRef)
], PurchaseComponent.prototype, "cardBrand", void 0);
__decorate([
    core_1.ViewChild('last4'),
    __metadata("design:type", core_1.ElementRef)
], PurchaseComponent.prototype, "cardFour", void 0);
__decorate([
    core_1.ViewChild('expMonth'),
    __metadata("design:type", core_1.ElementRef)
], PurchaseComponent.prototype, "cardMonth", void 0);
__decorate([
    core_1.ViewChild('expYear'),
    __metadata("design:type", core_1.ElementRef)
], PurchaseComponent.prototype, "cardYear", void 0);
__decorate([
    core_1.ViewChild('billingPostalCode'),
    __metadata("design:type", core_1.ElementRef)
], PurchaseComponent.prototype, "cardPostCode", void 0);
__decorate([
    core_1.ViewChild('detailContainer'),
    __metadata("design:type", core_1.ElementRef)
], PurchaseComponent.prototype, "detailContainer", void 0);
PurchaseComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-purchase',
        templateUrl: 'purchase.component.html',
        styleUrls: ['purchase.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute,
        purchase_service_1.PurchaseService,
        login_service_1.LoginService,
        activity_service_1.ActivityService,
        product_service_1.ProductService])
], PurchaseComponent);
exports.PurchaseComponent = PurchaseComponent;
//# sourceMappingURL=purchase.component.js.map