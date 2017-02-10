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
var InvoiceService = (function () {
    function InvoiceService(http) {
        this.http = http;
        this.size = config_1.Config.PAGE_NUM;
        this.statusChange = new core_1.EventEmitter();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    // TODO: change get request to POST request using APIRequest
    // TODO: add token to the request
    InvoiceService.prototype.getObjects = function (page, size, customerId) {
        var _this = this;
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            page: page,
            size: size,
            body: {
                id: customerId
            }
        });
        var url = config_1.Config.api_host + '/invoices';
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
    };
    // TODO: search/return one record by primary key using service.ts
    InvoiceService.prototype.getObject = function (id) {
        var _this = this;
        return this.getObjects(0, 1000, -1)
            .then(function (objects) { return objects.body.find(function (object) { return object.id == id; }); }).then(function (obj) {
            //obj.createdOn = formatDate(obj.createdOn);
            //obj.updatedOn = formatDate(obj.updatedOn);
            return obj;
        })
            .catch(function (ex) { return _this.handleError(ex); });
    };
    InvoiceService.prototype.update = function (object) {
        var _this = this;
        var url = config_1.Config.api_host + '/edit-invoice';
        object.createdOn = formatDate(object.createdOn);
        object.updatedOn = (new Date().getTime()).toString();
        object.updatedOn = formatDate(object.updatedOn);
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
    InvoiceService.prototype.delete = function (object) {
        var _this = this;
        var url = config_1.Config.api_host + '/delete-invoice';
        object.createdOn = formatDate(object.createdOn);
        object.updatedOn = (new Date().getTime()).toString();
        object.updatedOn = formatDate(object.updatedOn);
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
    InvoiceService.prototype.handleError = function (error) {
        this.emitStatusChangeEvent(null, config_1.Text.val(500));
        //return Promise.reject(error.message || error);
    };
    InvoiceService.prototype.emitStatusChangeEvent = function (object, message) {
        this.statusChange.emit({ object: object, message: message });
    };
    InvoiceService.prototype.getStatusChangeEmitter = function () {
        return this.statusChange;
    };
    return InvoiceService;
}());
InvoiceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], InvoiceService);
exports.InvoiceService = InvoiceService;
function toInvoice(response) {
    var object = ({
        id: response.id,
        description: response.description
    });
    console.log('invoice: ' + object.description);
    return object;
}
function formatDate(secondStr) {
    var date = new Date();
    var seconds = parseInt(secondStr);
    date.setTime(seconds);
    console.log("ISO Time String: " + date.toISOString());
    return date.toISOString();
}
//# sourceMappingURL=invoice.service.js.map