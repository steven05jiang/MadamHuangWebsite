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
var invoice_service_1 = require("./invoice.service");
var InvoiceDetailComponent = (function () {
    function InvoiceDetailComponent(router, service, route, location, window) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.route = route;
        this.location = location;
        this.window = window;
        this.message = this.service.message;
        this.subscription = this.service.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object) {
            }
            _this.message = $event.message;
        });
    }
    InvoiceDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            console.log("Got id ------: " + id);
            _this.service.getObject(id)
                .then(function (object) { return _this.object = object; });
        });
    };
    InvoiceDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    InvoiceDetailComponent.prototype.edit = function () {
        this.router.navigate(['/invoice-edit', this.object.id, -1]);
    };
    InvoiceDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    InvoiceDetailComponent.prototype.print = function () {
        this.window.print();
    };
    InvoiceDetailComponent.prototype.send = function () {
        this.window.location.href = "mailto:" + this.object.customer.email + "?subject=Invoice%20From%20Gallop%20Global&body=message%20goes%20here%0D%0AHello%20World.";
    };
    return InvoiceDetailComponent;
}());
InvoiceDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-invoice-detail',
        templateUrl: 'invoice-detail.component.html',
        styleUrls: ['invoice-detail.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        invoice_service_1.InvoiceService,
        router_1.ActivatedRoute,
        common_1.Location,
        Window])
], InvoiceDetailComponent);
exports.InvoiceDetailComponent = InvoiceDetailComponent;
//# sourceMappingURL=invoice-detail.component.js.map