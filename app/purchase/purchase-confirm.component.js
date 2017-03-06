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
var common_1 = require("@angular/common");
var purchase_service_1 = require("./purchase.service");
var login_service_1 = require("../login/login.service");
var PurchaseConfirmationComponent = (function () {
    function PurchaseConfirmationComponent(router, activatedRoute, location, purchaseService, loginService) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.purchaseService = purchaseService;
        this.loginService = loginService;
        this.paymentHelper = {};
        this.paymentHelper.isWaiting = false;
        if (this.purchaseService.serviceHelper.isRefresh) {
            this.router.navigate(['']);
        }
        else {
            this.purchaseObject = this.purchaseService.serviceHelper.purchaseObject;
            this.squareCharge = this.purchaseService.serviceHelper.squareCharge;
            this.productInfo = this.purchaseService.serviceHelper.productInfo;
            this.paymentHelper.receiverName = this.purchaseService.serviceHelper.receiverName;
            this.paymentHelper.cardData = this.purchaseService.serviceHelper.cardData;
            this.paymentHelper.preTaxNFeeTotalPrice = this.purchaseService.serviceHelper.preTaxNFeeTotalPrice;
            this.paymentHelper.preFeeTotalPrice = Math.round(this.paymentHelper.preTaxNFeeTotalPrice * 1.0625);
            this.purchaseCategory = this.purchaseService.serviceHelper.purchaseCategory;
            this.purchaseService.serviceHelper.isRefresh = true;
        }
        this.user = this.loginService.user;
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if (!$event.user) {
                _this.router.navigate(['']);
            }
        });
    }
    PurchaseConfirmationComponent.prototype.ngOnInit = function () {
    };
    PurchaseConfirmationComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    PurchaseConfirmationComponent.prototype.onSubmit = function () {
        var _this = this;
        this.paymentHelper.isWaiting = true;
        this.purchaseService.sendPurchase(this.squareCharge, this.productInfo).then(function (response) {
            _this.purchaseService.serviceHelper.result.message = response.message;
            _this.purchaseService.serviceHelper.isRefresh = false;
            if (response.code == '200') {
                _this.purchaseService.serviceHelper.result.invoice = response.body;
                _this.router.navigate(['purchase/result/success']);
            }
            else if (response.code == '510') {
                _this.router.navigate(['purchase/result/error']);
            }
            else {
                _this.router.navigate(['purchase/result/fail']);
            }
        });
    };
    PurchaseConfirmationComponent.prototype.parsePrice = function (price) {
        price = Math.round(price);
        return parseFloat(price) / 100;
    };
    PurchaseConfirmationComponent.prototype.onModify = function () {
        this.purchaseService.serviceHelper.isRefresh = false;
        this.location.back();
    };
    return PurchaseConfirmationComponent;
}());
PurchaseConfirmationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-purchase-confirm',
        templateUrl: 'purchase-confirm.component.html',
        styleUrls: ['purchase-confirm.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute,
        common_1.Location,
        purchase_service_1.PurchaseService,
        login_service_1.LoginService])
], PurchaseConfirmationComponent);
exports.PurchaseConfirmationComponent = PurchaseConfirmationComponent;
//# sourceMappingURL=purchase-confirm.component.js.map