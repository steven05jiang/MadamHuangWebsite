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
var login_service_1 = require("../login/login.service");
// Menu Component
var MenuComponent = (function () {
    function MenuComponent(loginService) {
        var _this = this;
        this.loginService = loginService;
        this.user = this.loginService.user;
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.user) {
                _this.user = $event.user;
            }
            // TODO: message is not used for now.
            //this.message = $event.message;
        });
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    MenuComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    MenuComponent.prototype.signin = function () {
        alert('sign in');
    };
    MenuComponent.prototype.signout = function (event) {
        //alert('sign out');
        this.loginService.signout();
    };
    MenuComponent.prototype.search = function (event) {
        alert('not implement');
    };
    return MenuComponent;
}());
MenuComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "my-menu",
        templateUrl: 'menu.component.html',
        styleUrls: ['menu.component.css']
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], MenuComponent);
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map