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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var customer_service_1 = require("./customer.service");
var CustomerDetailComponent = (function () {
    function CustomerDetailComponent(router, service, route, location) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.route = route;
        this.location = location;
        this.message = this.service.message;
        this.subscription = this.service.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object) {
            }
            _this.message = $event.message;
        });
    }
    CustomerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.service.getObject(id)
                .then(function (object) { return _this.object = object; });
        });
    };
    CustomerDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CustomerDetailComponent.prototype.edit = function () {
        this.router.navigate(['/customer-edit', this.object.id]);
    };
    CustomerDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return CustomerDetailComponent;
}());
CustomerDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-customer-detail',
        templateUrl: 'customer-detail.component.html',
        styleUrls: ['customer-detail.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        customer_service_1.CustomerService,
        router_1.ActivatedRoute,
        common_1.Location])
], CustomerDetailComponent);
exports.CustomerDetailComponent = CustomerDetailComponent;
//# sourceMappingURL=customer-detail.component.js.map