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
var customer_1 = require("./customer");
var customer_service_1 = require("./customer.service");
var lookup_data_1 = require("../lookup/lookup-data");
var CustomerEditComponent = (function () {
    function CustomerEditComponent(service, route, router, location) {
        var _this = this;
        this.service = service;
        this.route = route;
        this.router = router;
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
            disableUntil: { year: 1900, month: 1, day: 1 },
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
    CustomerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            console.log('id: ' + id);
            if (id == -1) {
                _this.object = new customer_1.Customer();
            }
            else {
                _this.service.getObject(id).then(function (object) { return _this.object = object; });
            }
        });
    };
    CustomerEditComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CustomerEditComponent.prototype.save = function () {
        var _this = this;
        if (this.object.id == -1) {
            this.service.add(this.object)
                .then(function () {
                _this.router.navigate(['customers']);
            });
        }
        else {
            this.service.update(this.object)
                .then(function () { return _this.goBack(); });
        }
    };
    CustomerEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    CustomerEditComponent.prototype.onBirthdayChanged = function (event) {
        this.object.birthday = event.formatted;
    };
    CustomerEditComponent.prototype.onpIssuedDateChanged = function (event) {
        this.object.pIssueDate = event.formatted;
    };
    CustomerEditComponent.prototype.onpExpDateChanged = function (event) {
        this.object.pExpDate = event.formatted;
    };
    return CustomerEditComponent;
}());
CustomerEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-customer-edit',
        templateUrl: 'customer-edit.component.html',
        styleUrls: ['customer-edit.component.css']
    }),
    __metadata("design:paramtypes", [customer_service_1.CustomerService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location])
], CustomerEditComponent);
exports.CustomerEditComponent = CustomerEditComponent;
//# sourceMappingURL=customer-edit.component.js.map