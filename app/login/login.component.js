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
var login_service_1 = require("./login.service");
var user_1 = require("../user/user");
var LoginComponent = (function () {
    function LoginComponent(loginService, router, activatedRoute, http) {
        var _this = this;
        this.loginService = loginService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.http = http;
        this.loginUser = new user_1.User();
        this.loginUser.username = '';
        this.loginUser.password = '';
        console.log('loginComponent: constructor called');
        this.message = this.loginService.message;
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.user) {
                _this.user = $event.user;
                _this.loginUser = _this.user;
                _this.router.navigate(['']);
            }
            _this.message = $event.message;
        });
    }
    LoginComponent.prototype.login = function () {
        this.clearMessage();
        this.loginService.signin(this.loginUser);
    };
    LoginComponent.prototype.clearMessage = function () {
        this.message = '';
    };
    LoginComponent.prototype.ngOnInit = function () {
        // this.activatedRoute.params.forEach((params: Params) => {
        //   let code = +params['code'];
        //   this.message = Text.val(code); //code.toString();
        // });
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