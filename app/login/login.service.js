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
var LoginService = (function () {
    function LoginService(router, http) {
        this.router = router;
        this.http = http;
        this.statusChange = new core_1.EventEmitter();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    LoginService.prototype.signin = function (user) {
        var _this = this;
        console.log('API Host: ' + config_1.Config.api_host);
        var url = config_1.Config.api_host + '/login';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: '',
            body: user
        });
        console.log(JSON.stringify(apiRequest));
        this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            if (response.json().code == '200') {
                var token = response.json().token;
                localStorage.setItem('token', token);
                _this.user = response.json().body;
                console.log('Token: ' + token);
                _this.emitStatusChangeEvent(_this.user, '');
            }
            else {
                localStorage.setItem('token', '');
                //this.status = new Status();
                _this.message = config_1.Text.val(100); //'Failed - invalid user name or password!';
                //this.message = 'Failed - invalid user name or password!';
                _this.emitStatusChangeEvent(null, _this.message);
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    LoginService.prototype.signup = function (user) {
        var _this = this;
        console.log('API Host: ' + config_1.Config.api_host);
        var url = config_1.Config.api_host + '/signup';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: '',
            body: user
        });
        console.log(JSON.stringify(apiRequest));
        this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            if (response.json().code == '200') {
                var token = response.json().token;
                localStorage.setItem('token', token);
                _this.user = response.json().body;
                console.log('Token: ' + token);
                _this.emitStatusChangeEvent(_this.user, '');
            }
            else {
                localStorage.setItem('token', '');
                //this.status = new Status();
                _this.message = config_1.Text.val(100); //'Failed - invalid user name or password!';
                //this.message = 'Failed - invalid user name or password!';
                _this.emitStatusChangeEvent(null, _this.message);
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    LoginService.prototype.updateProfile = function (user) {
        var _this = this;
        console.log('API Host: ' + config_1.Config.api_host);
        var url = config_1.Config.api_host + '/user-update';
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
                _this.user = response.json().body;
                console.log('Token: ' + token);
                //this.emitStatusChangeEvent(this.user, '');
                return _this.user;
            }
            else if (response.json().code == '403') {
                localStorage.setItem('token', '');
                _this.message = config_1.Text.val(200); //'Failed - invalid user name or password!';
                //this.message = 'Failed - invalid user name or password!';
                _this.emitStatusChangeEvent(null, _this.message);
            }
            else {
                var token = response.json().token;
                localStorage.setItem('token', token);
                _this.message = config_1.Text.val(500);
                _this.emitStatusChangeEvent(_this.user, _this.message);
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    LoginService.prototype.changePassword = function (passwordHelper) {
        var _this = this;
        console.log('API Host: ' + config_1.Config.api_host);
        var url = config_1.Config.api_host + '/user-update-password';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: passwordHelper
        });
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            if (response.json().code == '200') {
                var token = response.json().token;
                localStorage.setItem('token', token);
                _this.user = response.json().body;
                console.log('Token: ' + token);
                //this.emitStatusChangeEvent(this.user, '');
                return _this.user;
            }
            else if (response.json().code == '403') {
                localStorage.setItem('token', '');
                //this.status = new Status();
                _this.user = null;
                _this.message = config_1.Text.val(200); //'Failed - invalid user name or password!';
                //this.message = 'Failed - invalid user name or password!';
                _this.emitStatusChangeEvent(null, _this.message);
            }
            else {
                _this.message = config_1.Text.val(500); //'Failed - invalid user name or password!';
                //this.message = 'Failed - invalid user name or password!';
                _this.emitStatusChangeEvent(_this.user, _this.message);
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    LoginService.prototype.onSubmit = function () {
        this.user = null;
        //this.emitStatusChangeEvent('You have successfully logged out!');
        this.message = "You have succesfully logged out!";
        this.emitStatusChangeEvent(null, this.message);
    };
    LoginService.prototype.signout = function () {
        localStorage.setItem('token', '');
        this.user = null;
        //this.emitStatusChangeEvent('You have successfully logged out!');
        this.message = "You have succesfully logged out!";
        this.emitStatusChangeEvent(null, this.message);
    };
    LoginService.prototype.refreshToken = function (myToken) {
        var _this = this;
        var url = config_1.Config.api_host + '/refresh-token';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: myToken,
            body: {}
        });
        this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response.json().code == '200') {
                var token = response.json().token;
                localStorage.setItem('token', token);
                _this.user = response.json().body;
                // we use this to notify the menu component
                _this.emitStatusChangeEvent(_this.user, '');
            }
            else {
                localStorage.setItem('token', '');
                _this.message = config_1.Text.val(100); //'Failed - invalid user name or password!';
                // TODO - the following logic is not used. Can be improved to handle ...
                _this.emitStatusChangeEvent(null, _this.message);
            }
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    //private handleError(error: any): Promise<any> {
    LoginService.prototype.handleError = function (error) {
        this.emitStatusChangeEvent(null, config_1.Text.val(500));
        //return Promise.reject(error.message || error);
    };
    LoginService.prototype.emitStatusChangeEvent = function (user, message) {
        this.statusChange.emit({ user: user, message: message });
    };
    LoginService.prototype.getStatusChangeEmitter = function () {
        return this.statusChange;
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map