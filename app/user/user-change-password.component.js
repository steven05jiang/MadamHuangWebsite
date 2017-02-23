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
var http_1 = require("@angular/http");
var login_service_1 = require("../login/login.service");
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(loginService, router, activatedRoute, http) {
        var _this = this;
        this.loginService = loginService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.http = http;
        console.log('loginComponent: constructor called');
        this.passwordHelper = {};
        this.passwordHelper.oldPassword = '';
        this.passwordHelper.confirmPassword = '';
        this.passwordHelper.newPassword = '';
        this.message = this.loginService.message;
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.user) {
                _this.user = $event.user;
                _this.passwordHelper.username = _this.user.username;
            }
            else {
                _this.router.navigate(['login']);
            }
            _this.message = $event.message;
        });
    }
    ChangePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.passwordHelper.newPassword != this.passwordHelper.confirmPassword) {
            this.message = '輸入密碼不一致';
        }
        else {
            this.loginService.changePassword(this.passwordHelper).then(function (user) { return _this.router.navigate(['/profile']); });
        }
    };
    ChangePasswordComponent.prototype.onCancel = function () {
        this.router.navigate(['/profile']);
    };
    ChangePasswordComponent.prototype.clearMessage = function () {
        this.message = '';
    };
    ChangePasswordComponent.prototype.ngOnInit = function () {
        // this.activatedRoute.params.forEach((params: Params) => {
        //   let code = +params['code'];
        //   this.message = Text.val(code); //code.toString();
        // });
    };
    ChangePasswordComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return ChangePasswordComponent;
}());
ChangePasswordComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-change-password',
        templateUrl: 'user-change-password.component.html',
        styleUrls: ['user-change-password.component.css']
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        router_1.Router,
        router_2.ActivatedRoute,
        http_1.Http])
], ChangePasswordComponent);
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=user-change-password.component.js.map