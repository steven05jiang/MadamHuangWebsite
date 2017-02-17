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
var contact_1 = require("../contact/contact");
var contact_service_1 = require("../contact/contact.service");
var http_1 = require("@angular/http");
var HomeComponent = (function () {
    function HomeComponent(contactService, http) {
        var _this = this;
        this.contactService = contactService;
        this.http = http;
        this.msg = new contact_1.Message();
        this.subscription = this.contactService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object != null) {
                _this.msg = new contact_1.Message();
            }
            _this.message = $event.message;
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    HomeComponent.prototype.clearMessage = function () {
        this.message = '';
    };
    HomeComponent.prototype.onSubmit = function () {
        this.contactService.sendMessage(this.msg);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-home',
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.css']
    }),
    __metadata("design:paramtypes", [contact_service_1.ContactService, http_1.Http])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map