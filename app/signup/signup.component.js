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
var SignupComponent = (function () {
    function SignupComponent(loginService, router, activatedRoute, http) {
        var _this = this;
        this.loginService = loginService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.http = http;
        this.newUser = ({
            username: '',
            password: ''
        });
        this.passwordHelper = {};
        this.passwordHelper.confirmPassword = '';
        this.signupHelper = {};
        this.signupHelper.isWaiting = false;
        //console.log('loginComponent: constructor called');
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.user) {
                _this.user = $event.user;
                _this.newUser = _this.user;
                _this.router.navigate(['']);
            }
            _this.signupHelper.isWaiting = false;
            _this.message = $event.message;
        });
    }
    SignupComponent.prototype.signup = function () {
        if (this.newUser.password != this.passwordHelper.confirmPassword) {
            this.message = '輸入密碼不一致';
        }
        else {
            this.signupHelper.isWaiting = true;
            this.loginService.signup(this.newUser);
        }
    };
    SignupComponent.prototype.clearMessage = function () {
        this.message = '';
    };
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-signup',
        templateUrl: 'signup.component.html',
        styleUrls: ['signup.component.css']
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        router_1.Router,
        router_2.ActivatedRoute,
        http_1.Http])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map