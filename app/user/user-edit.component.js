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
var user_image_1 = require("./user-image");
var UserEditComponent = (function () {
    function UserEditComponent(router, activatedRoute, loginService) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loginService = loginService;
        this.defaultImage = 'image/loading.png';
        this.editHelper = {};
        this.editHelper.isWaiting = false;
        this.headImages = user_image_1.USER_IMAGE;
        this.user = this.loginService.user;
        this.updatedUser = Object.assign({}, this.user);
        if (!this.updatedUser.imageLink) {
            this.updatedUser.imageLink = config_1.Config.user_header_folder + '/book.jpg';
        }
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.user) {
                _this.user = $event.user;
            }
            else {
                _this.router.navigate(['login']);
                _this.user = null;
            }
            // TODO: message is not used for now.
            _this.editHelper.isWaiting = false;
            _this.message = $event.message;
        });
    }
    UserEditComponent.prototype.ngOnInit = function () {
    };
    UserEditComponent.prototype.clearMessage = function () {
        this.message = '';
    };
    UserEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.clearMessage();
        this.editHelper.isWaiting = true;
        this.loginService.updateProfile(this.updatedUser).then(function (user) { return _this.router.navigate(['/profile']); });
    };
    UserEditComponent.prototype.onCancel = function () {
        this.router.navigate(['/profile']);
    };
    UserEditComponent.prototype.selectImage = function (imageLink) {
        this.selectedImage = imageLink;
    };
    UserEditComponent.prototype.onSaveImage = function () {
        this.updatedUser.imageLink = this.selectedImage;
    };
    UserEditComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return UserEditComponent;
}());
UserEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-user-edit',
        templateUrl: 'user-edit.component.html',
        styleUrls: ['user-edit.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute,
        login_service_1.LoginService])
], UserEditComponent);
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit.component.js.map