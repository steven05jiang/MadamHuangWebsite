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
var config_1 = require("../common/config");
var event_1 = require("../common/event");
var customer_service_1 = require("./customer.service");
var CustomersComponent = (function () {
    function CustomersComponent(router, service) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.size = config_1.Config.PAGE_NUM;
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
    CustomersComponent.prototype.getObjects = function (page, size) {
        var _this = this;
        this.service.getObjects(page, size).then(function (apiResponse) {
            _this.apiResponse = apiResponse;
            _this.objects = apiResponse.body;
        });
    };
    CustomersComponent.prototype.ngOnInit = function () {
        this.getObjects(0, config_1.Config.PAGE_NUM);
    };
    CustomersComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CustomersComponent.prototype.onSelect = function (object) {
        this.selectedObject = object;
    };
    CustomersComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/customer-detail', this.selectedObject.id]);
    };
    CustomersComponent.prototype.gotoEdit = function () {
        this.router.navigate(['/customer-edit', this.selectedObject.id]);
    };
    CustomersComponent.prototype.view = function (object) {
        this.onSelect(object);
        this.router.navigate(['/customer-detail', this.selectedObject.id]);
    };
    CustomersComponent.prototype.edit = function (object) {
        this.onSelect(object);
        this.router.navigate(['/customer-edit', this.selectedObject.id]);
    };
    CustomersComponent.prototype.delete = function (object) {
        if (confirm('are you sure?')) {
            this.onSelect(object);
            this.service.delete(this.selectedObject);
        }
        //}
    };
    CustomersComponent.prototype.add = function () {
        this.router.navigate(['/customer-edit', -1]);
    };
    CustomersComponent.prototype.selectObjects = function (event) {
        //alert("page change");
        //this.page = this.paginationComponent.page; // pass parameter from service (triggered by pageChange Event)
        //this.size = this.paginationComponent.size;
        this.getObjects(event.page, event.size);
    };
    CustomersComponent.prototype.invoices = function (obj) {
        this.onSelect(obj);
        // passing customer id
        this.router.navigate(['/invoices', this.selectedObject.id]);
    };
    CustomersComponent.prototype.invoiceAdd = function (obj) {
        this.onSelect(obj);
        // passing new invoice id (-1) and customer id
        this.router.navigate(['/invoice-edit', -1, this.selectedObject.id]);
    };
    return CustomersComponent;
}());
CustomersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-customers',
        templateUrl: 'customers.component.html',
        styleUrls: ['customers.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        customer_service_1.CustomerService])
], CustomersComponent);
exports.CustomersComponent = CustomersComponent;
//# sourceMappingURL=customers.component.js.map