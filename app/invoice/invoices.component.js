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
var router_2 = require("@angular/router");
var config_1 = require("../common/config");
var event_1 = require("../common/event");
var invoice_service_1 = require("./invoice.service");
var customer_service_1 = require("../customer/customer.service");
var InvoicesComponent = (function () {
    function InvoicesComponent(router, activatedRoute, service, customerService) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.customerService = customerService;
        this.message = this.service.message;
        this.subscription = this.service.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object instanceof event_1.Event && $event.object.type == event_1.Event.RELOAD) {
                // do nothing - reserved for future
                //this.user = $event.user;
                _this.ngOnInit();
            }
            _this.message = $event.message;
        });
    }
    InvoicesComponent.prototype.getObjects = function (page, size, customerId) {
        var _this = this;
        this.customerId = customerId;
        this.service.getObjects(page, size, customerId).then(function (apiResponse) {
            _this.apiResponse = apiResponse;
            _this.objects = apiResponse.body;
        });
        this.customerService.getObject(customerId).then(function (customer) { return _this.customer = customer; });
    };
    InvoicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // getting parameter from route (as customer_id)
        this.activatedRoute.params.forEach(function (params) {
            var customerId = +params['customer_id'];
            console.log('customerId: ' + customerId);
            //this.service.getObject(id).then(object => this.object = object);
            // TODO: we load invoices for this customer
            _this.getObjects(0, config_1.Config.PAGE_NUM, customerId);
            _this.customerService.getObject(customerId).then(function (customer) { return _this.customer = customer; });
        });
    };
    InvoicesComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    InvoicesComponent.prototype.onSelect = function (object) {
        this.selectedObject = object;
    };
    InvoicesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/invoice-detail', this.selectedObject.id]);
    };
    InvoicesComponent.prototype.gotoEdit = function () {
        this.router.navigate(['/invoice-edit', this.selectedObject.id, -1]);
        //this.router.navigate(['/invoice-edit', {id: this.selectedObject.id}]);
    };
    InvoicesComponent.prototype.view = function (object) {
        this.onSelect(object);
        this.router.navigate(['/invoice-detail', this.selectedObject.id]);
    };
    InvoicesComponent.prototype.edit = function (object) {
        this.onSelect(object);
        this.router.navigate(['/invoice-edit', this.selectedObject.id, -1]);
        //this.router.navigate(['/invoice-edit', {id: this.selectedObject.id}]);
    };
    InvoicesComponent.prototype.add = function () {
        this.router.navigate(['/invoice-edit', -1, this.selectedObject.customer.id]);
    };
    InvoicesComponent.prototype.delete = function (object) {
        console.log('in delete');
        if (confirm('are you sure?')) {
            this.onSelect(object);
            this.service.delete(this.selectedObject);
        }
    };
    InvoicesComponent.prototype.selectObjects = function (event) {
        this.getObjects(event.page, event.size, this.customerId);
    };
    InvoicesComponent.prototype.invoiceAdd = function (obj) {
        // passing new invoice id (-1) and customer id
        this.router.navigate(['/invoice-edit', -1, obj.id]);
    };
    return InvoicesComponent;
}());
InvoicesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-users',
        templateUrl: 'invoices.component.html',
        styleUrls: ['invoices.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute,
        invoice_service_1.InvoiceService,
        customer_service_1.CustomerService])
], InvoicesComponent);
exports.InvoicesComponent = InvoicesComponent;
//# sourceMappingURL=invoices.component.js.map