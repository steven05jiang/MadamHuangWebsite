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
var http_1 = require("@angular/http");
var config_1 = require("../common/config");
var login_service_1 = require("./login.service");
var LoginComponent = (function () {
    function LoginComponent(loginService, router, activatedRoute, http) {
        var _this = this;
        this.loginService = loginService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.http = http;
        this.user = ({
            username: '',
            password: ''
        });
        console.log('loginComponent: constructor called');
        this.message = this.loginService.message;
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.user) {
                _this.user = $event.user;
            }
            _this.message = $event.message;
        });
    }
    LoginComponent.prototype.login = function () {
        this.loginService.signin(this.user);
    };
    LoginComponent.prototype.clearMessage = function () {
        this.message = '';
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('loginComponent: OnInit() called');
        //this.message = '';
        this.activatedRoute.params.forEach(function (params) {
            var code = +params['code'];
            _this.message = config_1.Text.val(code); //code.toString();
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-login',
        templateUrl: 'login.component.html',
        styleUrls: ['login.component.css']
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        router_1.Router,
        router_2.ActivatedRoute,
        http_1.Http])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map