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
var router_1 = require("@angular/router");
require("rxjs/add/operator/toPromise");
var ContactService = (function () {
    function ContactService(router, http) {
        this.router = router;
        this.http = http;
        this.statusChange = new core_1.EventEmitter();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    ContactService.prototype.sendMessage = function (msg) {
        var _this = this;
        this.msg = msg;
        var url = config_1.Config.api_host + '/send-message';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: '',
            body: msg
        });
        console.log(JSON.stringify(apiRequest));
        this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            if (response.json().code == '200') {
                _this.emitStatusChangeEvent(_this.msg, response.json().message);
            }
            else {
                _this.emitStatusChangeEvent(null, response.json().message);
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    ContactService.prototype.getMessages = function (user) {
        var _this = this;
        console.log('API Host: ' + config_1.Config.api_host);
        var url = config_1.Config.api_host + '/messages';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: user
        });
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            if (response.json().code == '200') {
                var token = response.json().token;
                localStorage.setItem('token', token);
                return response.json();
            }
            else {
                localStorage.setItem('token', '');
                _this.emitStatusChangeEvent(null, response.json().message);
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    //private handleError(error: any): Promise<any> {
    ContactService.prototype.handleError = function (error) {
        this.emitStatusChangeEvent(null, config_1.Text.val(500));
        //return Promise.reject(error.message || error);
    };
    ContactService.prototype.emitStatusChangeEvent = function (object, message) {
        this.statusChange.emit({ object: object, message: message });
    };
    ContactService.prototype.getStatusChangeEmitter = function () {
        return this.statusChange;
    };
    return ContactService;
}());
ContactService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map