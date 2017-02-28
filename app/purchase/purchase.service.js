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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var config_1 = require("../common/config");
require("rxjs/add/operator/toPromise");
var PurchaseService = (function () {
    function PurchaseService(http) {
        this.http = http;
        this.statusChange = new core_1.EventEmitter();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        this.serviceHelper = {};
        this.serviceHelper.isRefresh = true;
        this.serviceHelper.squareCharge = null;
        this.serviceHelper.productInfo = null;
        this.serviceHelper.purchaseObject = null;
        this.serviceHelper.receiverName = null;
        this.serviceHelper.cardData = {};
        this.serviceHelper.result = null;
        this.serviceHelper.purchaseCategory = null;
    }
    PurchaseService.prototype.sendPurchase = function (charge, info) {
        var _this = this;
        var apiRequest = ({
            apiKey: '',
            operator: '',
            token: config_1.Config.getToken(),
            body: {
                'charge': charge,
                'info': info
            }
        });
        var url = config_1.Config.api_host + '/purchase';
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
    PurchaseService.prototype.handleError = function (error) {
        this.emitStatusChangeEvent(null, config_1.Text.val(500));
        //return Promise.reject(error.message || error);
    };
    PurchaseService.prototype.emitStatusChangeEvent = function (object, message) {
        this.statusChange.emit({ object: object, message: message });
    };
    PurchaseService.prototype.getStatusChangeEmitter = function () {
        return this.statusChange;
    };
    return PurchaseService;
}());
PurchaseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PurchaseService);
exports.PurchaseService = PurchaseService;
//# sourceMappingURL=purchase.service.js.map