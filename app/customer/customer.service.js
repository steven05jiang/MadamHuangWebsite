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
var event_1 = require("../common/event");
var config_1 = require("../common/config");
require("rxjs/add/operator/toPromise");
var CustomerService = (function () {
    function CustomerService(http) {
        this.http = http;
        this.statusChange = new core_1.EventEmitter();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    // TODO: change get request to POST request using APIRequest
    // TODO: add token to the request
    CustomerService.prototype.getObjects = function (page, size) {
        var _this = this;
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            page: page,
            size: size
        });
        var url = config_1.Config.api_host + '/customers';
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
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
    // TODO: current approach read all objects from backend
    // TODO: future: read a single selection of record from backend
    CustomerService.prototype.getObject = function (id) {
        var _this = this;
        return this.getObjects(0, 1000)
            .then(function (objects) { return objects.body.find(function (object) { return object.id == id; }); })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    CustomerService.prototype.update = function (object) {
        var _this = this;
        var url = config_1.Config.api_host + '/edit-customer';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: object
        });
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response.json().body;
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    CustomerService.prototype.delete = function (object) {
        var _this = this;
        var url = config_1.Config.api_host + '/delete-customer';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: object
        });
        console.log(JSON.stringify(apiRequest));
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
    CustomerService.prototype.add = function (object) {
        var _this = this;
        var url = config_1.Config.api_host + '/create-customer';
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: object
        });
        console.log(JSON.stringify(apiRequest));
        return this.http.post(url, JSON.stringify(apiRequest), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response.json().body;
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    CustomerService.prototype.handleError = function (error) {
        this.emitStatusChangeEvent(null, config_1.Text.val(500));
        //return Promise.reject(error.message || error);
    };
    CustomerService.prototype.emitStatusChangeEvent = function (object, message) {
        this.statusChange.emit({ object: object, message: message });
    };
    CustomerService.prototype.getStatusChangeEmitter = function () {
        return this.statusChange;
    };
    return CustomerService;
}());
CustomerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CustomerService);
exports.CustomerService = CustomerService;
function toCustomer(response) {
    var customer = ({
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        description: response.description
    });
    console.log("customer: " + customer.firstName);
    return customer;
}
function toAPIResponse(response) {
    var apiResponse = ({
        code: response.code,
        message: response.message,
        token: response.token,
        body: response.body.map(toCustomer),
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        last: response.last,
        first: response.first,
        number: response.number,
        numberOfElements: response.numberOfElements,
        sort: response.sort
    });
    //console.log("customer: " + customer.firstName);
    return apiResponse;
}
//# sourceMappingURL=customer.service.js.map