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
var ActivityService = (function () {
    function ActivityService(http) {
        this.http = http;
        this.size = config_1.Config.PAGE_NUM;
        this.statusChange = new core_1.EventEmitter();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    // TODO: change get request to POST request using APIRequest
    // TODO: add token to the request
    ActivityService.prototype.getObjects = function (page, size) {
        var _this = this;
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            page: page,
            size: size
        });
        var url = config_1.Config.api_host + '/activities';
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var token = response.json().token;
            localStorage.setItem('token', token);
            if (response.json().code == '200') {
                return response.json();
            }
            else {
                _this.message = config_1.Text.val(500);
                _this.emitStatusChangeEvent(null, _this.message);
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    // TODO: search/return one record by primary key using service.ts
    ActivityService.prototype.getObject = function (id) {
        var _this = this;
        return this.getObjects(0, 1000)
            .then(function (objects) { return objects.body.find(function (object) { return object.id == id; }); }).then(function (obj) {
            return obj;
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    ActivityService.prototype.handleError = function (error) {
        this.emitStatusChangeEvent(null, config_1.Text.val(500));
        //return Promise.reject(error.message || error);
    };
    ActivityService.prototype.emitStatusChangeEvent = function (object, message) {
        this.statusChange.emit({ object: object, message: message });
    };
    ActivityService.prototype.getStatusChangeEmitter = function () {
        return this.statusChange;
    };
    return ActivityService;
}());
ActivityService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ActivityService);
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map