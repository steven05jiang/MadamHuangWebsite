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
var config_1 = require("../common/config");
var login_service_1 = require("../login/login.service");
var UserProfileComponent = (function () {
    function UserProfileComponent(router, activatedRoute, loginService) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loginService = loginService;
        this.defaultImage = 'image/loading.png';
        this.user = this.loginService.user;
        if (!this.user.imageLink) {
            this.user.imageLink = config_1.Config.user_header_folder + '/book.jpg';
        }
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.user) {
                _this.user = $event.user;
            }
            else {
                _this.router.navigate(['login']);
            }
            // TODO: message is not used for now.
            //this.message = $event.message;
        });
    }
    UserProfileComponent.prototype.ngOnInit = function () {
    };
    UserProfileComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return UserProfileComponent;
}());
UserProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-user-profile',
        templateUrl: 'user-profile.component.html',
        styleUrls: ['user-profile.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute,
        login_service_1.LoginService])
], UserProfileComponent);
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map