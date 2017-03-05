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
var config_1 = require("../common/config");
var login_service_1 = require("../login/login.service");
var user_service_1 = require("./user.service");
var UserProfileComponent = (function () {
    function UserProfileComponent(router, activatedRoute, loginService, userService) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loginService = loginService;
        this.userService = userService;
        this.defaultImage = 'image/loading.png';
        this.invoiceHelper = {};
        this.invoiceHelper.invoiceSize = 10;
        this.invoiceHelper.invoicePage = 0;
        this.invoiceHelper.invoiceTotalPage = 1;
        this.invoiceHelper.invoiceMessage = '';
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
        this.user = this.loginService.user;
        if (!this.user) {
            this.router.navigate(['login']);
        }
        else {
            if (!this.user.imageLink) {
                this.user.imageLink = config_1.Config.user_header_folder + '/book.jpg';
            }
            this.loginService.refreshToken(config_1.Config.getToken());
        }
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
            //$('.tooltip-arrow').css('background', 'rgb(138,0,35)');
            //$('[data-toggle="tooltip"]').hover(()=>{
            //$('.tooltip-inner').css('background', 'rgb(138,0,35)');
            //$('.tooltip.top-right .tooltip-arrow').css('background', 'rgb(138,0,35)');
            //});
        });
    };
    UserProfileComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UserProfileComponent.prototype.getMyInvoices = function (page) {
        var _this = this;
        if (page < 0 || (this.invoiceHelper.invoiceTotalPage != null && page >= this.invoiceHelper.invoiceTotalPage)) {
            alert('No more invoices.');
            return;
        }
        this.userService.getMyInvoices(page, this.invoiceHelper.invoiceSize).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.invoiceHelper.invoicePage = page;
                _this.invoiceHelper.invoiceTotalPage = response.totalPages;
                _this.invoices = response.body;
            }
            else {
                _this.invoiceHelper.invoiceMessage = response.message;
            }
        });
    };
    UserProfileComponent.prototype.parsePrice = function (price) {
        price = Math.round(price);
        return parseFloat(price) / 100;
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
        login_service_1.LoginService,
        user_service_1.UserService])
], UserProfileComponent);
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map