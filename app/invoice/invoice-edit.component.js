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
var invoice_1 = require("./invoice");
var invoice_service_1 = require("./invoice.service");
var customer_service_1 = require("../customer/customer.service");
var lookup_data_1 = require("../lookup/lookup-data");
var InvoiceEditComponent = (function () {
    function InvoiceEditComponent(service, customerService, route, location) {
        var _this = this;
        this.service = service;
        this.customerService = customerService;
        this.route = route;
        this.location = location;
        this.countries = lookup_data_1.COUNTRIES;
        this.myDatePickerOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            disableUntil: { year: 2016, month: 1, day: 1 },
            selectionTxtFontSize: '16px'
        };
        this.message = this.service.message;
        this.subscription = this.service.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object) {
            }
            _this.message = $event.message;
        });
    }
    InvoiceEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            var customerId = +params['customer_id'];
            console.log('======> id: ' + id + ' customer id: ' + customerId);
            if (id == -1) {
                // important: we only care about customer id when it is a new record
                // for existing record, we don't change customer id value
                _this.object = new invoice_1.Invoice();
                _this.customerService.getObject(customerId).then(function (customer) { return _this.object.customer = customer; });
            }
            else {
                _this.service.getObject(id).then(function (object) { return _this.object = object; });
            }
        });
    };
    InvoiceEditComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    InvoiceEditComponent.prototype.save = function () {
        var _this = this;
        this.service.update(this.object)
            .then(function () { return _this.goBack(); });
    };
    InvoiceEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    InvoiceEditComponent.prototype.addItem = function () {
        if (this.object.invoiceItems == null)
            this.object.invoiceItems = new Array();
        var items = this.object.invoiceItems;
        var item = new invoice_1.InvoiceItem();
        item.invoiceId = this.object.id;
        item.itemId = items.length + 1; // index start from 1.
        items.push(item);
        this.object.invoiceItems = items;
    };
    InvoiceEditComponent.prototype.removeItem = function (object) {
        if (this.object.invoiceItems == null)
            this.object.invoiceItems = new Array();
        this.object.invoiceItems.splice(this.object.invoiceItems.indexOf(object), 1);
    };
    InvoiceEditComponent.prototype.onInvoiceDateChanged = function (event) {
        this.object.invoiceDate = event.formatted;
    };
    return InvoiceEditComponent;
}());
InvoiceEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-invoice-edit',
        templateUrl: 'invoice-edit.component.html',
        styleUrls: ['invoice-edit.component.css']
    }),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService,
        customer_service_1.CustomerService,
        router_1.ActivatedRoute,
        common_1.Location])
], InvoiceEditComponent);
exports.InvoiceEditComponent = InvoiceEditComponent;
//# sourceMappingURL=invoice-edit.component.js.map