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
var purchase_service_1 = require("./purchase.service");
var PurchaseResultComponent = (function () {
    function PurchaseResultComponent(router, activatedRoute, purchaseService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.purchaseService = purchaseService;
        if (this.purchaseService.serviceHelper.isRefresh) {
            this.router.navigate(['']);
        }
        else {
            var pathArray = this.router.url.split('/');
            if (pathArray.length < 4) {
                this.router.navigate(['']);
            }
            this.status = pathArray[3];
            this.message = this.purchaseService.serviceHelper.result.message;
            this.invoice = this.purchaseService.serviceHelper.result.invoice;
            this.purchaseService.serviceHelper.isRefresh = true;
        }
    }
    PurchaseResultComponent.prototype.ngOnInit = function () {
    };
    return PurchaseResultComponent;
}());
PurchaseResultComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-purchase-result',
        templateUrl: 'purchase-result.component.html',
        styleUrls: ['purchase-result.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute,
        purchase_service_1.PurchaseService])
], PurchaseResultComponent);
exports.PurchaseResultComponent = PurchaseResultComponent;
//# sourceMappingURL=purchase-result.component.js.map