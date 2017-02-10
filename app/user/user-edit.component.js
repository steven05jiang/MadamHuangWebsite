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
var common_1 = require("@angular/common");
var user_1 = require("./user");
var user_service_1 = require("./user.service");
var lookup_data_1 = require("../lookup/lookup-data");
var UserEditComponent = (function () {
    function UserEditComponent(service, route, location) {
        var _this = this;
        this.service = service;
        this.route = route;
        this.location = location;
        this.countries = lookup_data_1.COUNTRIES;
        this.message = this.service.message;
        this.subscription = this.service.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object) {
            }
            _this.message = $event.message;
        });
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            console.log('id: ' + id);
            if (id == -1) {
                _this.object = new user_1.User();
            }
            else {
                _this.service.getObject(id).then(function (object) { return _this.object = object; });
            }
        });
    };
    UserEditComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UserEditComponent.prototype.save = function () {
        var _this = this;
        this.service.update(this.object)
            .then(function () { return _this.goBack(); });
    };
    UserEditComponent.prototype.goBack = function () {
        this.location.back();
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
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute,
        common_1.Location])
], UserEditComponent);
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit.component.js.map