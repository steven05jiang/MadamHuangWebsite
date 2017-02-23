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
var contact_1 = require("./contact");
var contact_service_1 = require("./contact.service");
var http_1 = require("@angular/http");
var ContactComponent = (function () {
    function ContactComponent(contactService, http) {
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
    ContactComponent.prototype.ngOnInit = function () {
    };
    ContactComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ContactComponent.prototype.clearMessage = function () {
        this.message = '';
    };
    ContactComponent.prototype.onSubmit = function () {
        this.contactService.sendMessage(this.msg);
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-contact',
        templateUrl: 'contact.component.html',
        styleUrls: ['contact.component.css']
    }),
    __metadata("design:paramtypes", [contact_service_1.ContactService, http_1.Http])
], ContactComponent);
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map