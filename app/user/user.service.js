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
var event_1 = require("../common/event");
require("rxjs/add/operator/toPromise");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.statusChange = new core_1.EventEmitter();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    // TODO: change get request to POST request using APIRequest
    // TODO: add token to the request
    UserService.prototype.getObjects = function (page, size) {
        var _this = this;
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            page: page,
            size: size
        });
        var url = config_1.Config.api_host + '/users';
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response.json().code == '200') {
                return response.json();
            }
            else {
                _this.message = config_1.Text.val(500);
                _this.emitStatusChangeEvent(null, _this.message);
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
        //return customers;
        //return Promise.resolve(CUSTOMERS);
    };
    UserService.prototype.getObject = function (id) {
        return this.getObjects(0, 1000)
            .then(
        //objects => objects.find(object => object.id == id)
        function (objects) { return objects.body.find(function (object) { return object.id == id; }); });
    };
    UserService.prototype.update = function (object) {
        var _this = this;
        var url = config_1.Config.api_host + '/edit-user';
        object.lastlogOn = config_1.Config.formatDate(object.lastlogOn);
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: object
        });
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response.json().body;
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    UserService.prototype.delete = function (object) {
        var _this = this;
        var url = config_1.Config.api_host + '/delete-user';
        object.lastlogOn = config_1.Config.formatDate(object.lastlogOn);
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: object
        });
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response.json().code != '200') {
                _this.emitStatusChangeEvent(null, 'Failed');
            }
            else {
                _this.emitStatusChangeEvent(new event_1.Event(event_1.Event.RELOAD), 'Delete Successful');
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    UserService.prototype.handleError = function (error) {
        this.emitStatusChangeEvent(null, config_1.Text.val(500));
        //return Promise.reject(error.message || error);
    };
    UserService.prototype.emitStatusChangeEvent = function (object, message) {
        this.statusChange.emit({ object: object, message: message });
    };
    UserService.prototype.getStatusChangeEmitter = function () {
        return this.statusChange;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
function toUser(response) {
    var object = ({
        id: response.id,
        username: response.username,
        password: response.password
    });
    console.log('customer: ' + object.username);
    return object;
}
//# sourceMappingURL=user.service.js.map