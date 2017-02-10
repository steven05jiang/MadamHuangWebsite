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
var config_1 = require("../common/config");
var event_1 = require("../common/event");
var user_service_1 = require("./user.service");
var UsersComponent = (function () {
    function UsersComponent(router, service) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.size = config_1.Config.PAGE_NUM;
        this.message = this.service.message;
        this.subscription = this.service.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object instanceof event_1.Event && $event.object.type == event_1.Event.RELOAD) {
                _this.ngOnInit();
            }
            _this.message = $event.message;
        });
    }
    UsersComponent.prototype.getObjects = function (page, size) {
        var _this = this;
        this.service.getObjects(page, size).then(function (apiResponse) {
            _this.apiResponse = apiResponse;
            _this.objects = apiResponse.body;
        });
    };
    UsersComponent.prototype.ngOnInit = function () {
        this.getObjects(0, config_1.Config.PAGE_NUM);
    };
    UsersComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UsersComponent.prototype.onSelect = function (object) {
        this.selectedObject = object;
    };
    UsersComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/user-detail', this.selectedObject.id]);
    };
    UsersComponent.prototype.gotoEdit = function () {
        this.router.navigate(['/user-edit', this.selectedObject.id]);
    };
    UsersComponent.prototype.view = function (object) {
        this.onSelect(object);
        this.router.navigate(['/user-detail', this.selectedObject.id]);
    };
    UsersComponent.prototype.edit = function (object) {
        this.onSelect(object);
        this.router.navigate(['/user-edit', this.selectedObject.id]);
    };
    UsersComponent.prototype.add = function () {
        this.router.navigate(['/user-edit', -1]);
    };
    UsersComponent.prototype.delete = function (object) {
        if (confirm('are you sure?')) {
            this.onSelect(object);
            this.service.delete(this.selectedObject);
        }
    };
    UsersComponent.prototype.selectObjects = function (event) {
        //alert("page change");
        //this.page = this.paginationComponent.page; // pass parameter from service (triggered by pageChange Event)
        //this.size = this.paginationComponent.size;
        this.getObjects(event.page, event.size);
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-users',
        templateUrl: 'users.component.html',
        styleUrls: ['users.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        user_service_1.UserService])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map