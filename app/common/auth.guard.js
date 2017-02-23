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
var angular2_jwt_1 = require("angular2-jwt");
var login_service_1 = require("../login/login.service");
//https://github.com/auth0-blog/angular2-authentication-sample/blob/master/src/home/home.ts
var AuthGuard = (function () {
    function AuthGuard(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    AuthGuard.prototype.canActivate = function () {
        var jwt = localStorage.getItem('token');
        console.log("JWT: = " + jwt);
        //if (tokenNotExpired() || true) {
        if (jwt != null && jwt != '' && jwt != 'null'
            && !this.jwtHelper.isTokenExpired(jwt)) {
            //console.log("JWT-Decode: " + this.jwtHelper.decodeToken(jwt));
            console.log("JWT-Expiration Date: " + this.jwtHelper.getTokenExpirationDate(jwt));
            // TODO - client: validate JWT token and expiration
            // TODO - server: refresh and renew token
            this.loginService.refreshToken(jwt);
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        login_service_1.LoginService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map