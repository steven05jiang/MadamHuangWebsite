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
var AdminService = (function () {
    function AdminService(router, http) {
        this.router = router;
        this.http = http;
        this.statusChange = new core_1.EventEmitter();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AdminService.prototype.updateArticle = function (article) {
        var _this = this;
        console.log('API Host: ' + config_1.Config.api_host);
        var url = config_1.Config.api_host + '/article-update';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: article
        });
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            var token = response.json().token;
            localStorage.setItem('token', token);
            return response.json();
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    AdminService.prototype.addArticle = function (article) {
        var _this = this;
        console.log('API Host: ' + config_1.Config.api_host);
        var url = config_1.Config.api_host + '/article-add';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: article
        });
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            var token = response.json().token;
            localStorage.setItem('token', token);
            return response.json();
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    AdminService.prototype.deleteArticle = function (id) {
        var _this = this;
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: { 'id': id }
        });
        var url = config_1.Config.api_host + '/article-delete';
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var token = response.json().token;
            localStorage.setItem('token', token);
            return response.json();
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    AdminService.prototype.getContacts = function (page, size) {
        var _this = this;
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            page: page,
            size: size
        });
        var url = config_1.Config.api_host + '/messages';
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var token = response.json().token;
            localStorage.setItem('token', token);
            return response.json();
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    //private handleError(error: any): Promise<any> {
    AdminService.prototype.handleError = function (error) {
        this.emitStatusChangeEvent(null, config_1.Text.val(500));
        //return Promise.reject(error.message || error);
    };
    AdminService.prototype.emitStatusChangeEvent = function (object, message) {
        this.statusChange.emit({ object: object, message: message });
    };
    AdminService.prototype.getStatusChangeEmitter = function () {
        return this.statusChange;
    };
    return AdminService;
}());
AdminService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map