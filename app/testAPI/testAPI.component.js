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
var http_1 = require("@angular/http");
var config_1 = require("../common/config");
require("rxjs/add/operator/toPromise");
var TestAPIComponent = (function () {
    function TestAPIComponent(http) {
        this.http = http;
        this.statusChange = new core_1.EventEmitter();
    }
    TestAPIComponent.prototype.ngOnInit = function () {
    };
    TestAPIComponent.prototype.testCall = function () {
        var _this = this;
        this.getObject()
            .then(function (object) { return _this.object = object; })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    TestAPIComponent.prototype.getObject = function () {
        var _this = this;
        var url = config_1.Config.api_host + '/users';
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.text();
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    TestAPIComponent.prototype.handleError = function (error) {
        this.emitStatusChangeEvent(null, 'Error');
        //return Promise.reject(error.message || error);
    };
    TestAPIComponent.prototype.emitStatusChangeEvent = function (object, message) {
        this.statusChange.emit({ object: object, message: message });
    };
    TestAPIComponent.prototype.getStatusChangeEmitter = function () {
        return this.statusChange;
    };
    return TestAPIComponent;
}());
TestAPIComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-testAPI',
        templateUrl: 'testAPI.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], TestAPIComponent);
exports.TestAPIComponent = TestAPIComponent;
//# sourceMappingURL=testAPI.component.js.map