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
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var event_1 = require("../common/event");
var product_service_1 = require("./product.service");
var ProductComponent = (function () {
    function ProductComponent(router, activatedRoute, service) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.defaultImage = 'image/loading.png';
        this.size = 9;
        this.page = 0;
        this.message = this.service.message;
        this.subscription = this.service.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object instanceof event_1.Event && $event.object.type == event_1.Event.RELOAD) {
                _this.ngOnInit();
            }
            _this.message = $event.message;
        });
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.getProducts(this.page);
    };
    ProductComponent.prototype.getProducts = function (page) {
        var _this = this;
        this.service.getObjects(page, this.size).then(function (apiResponse) {
            _this.apiResponse = apiResponse;
            _this.objects = apiResponse.body;
        });
    };
    ProductComponent.prototype.openArticle = function (product) {
        console.log('Ready to nav to article ' + product.articleId);
        this.router.navigate(['/article', product.articleId]);
    };
    return ProductComponent;
}());
ProductComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-product',
        templateUrl: 'product.component.html',
        styleUrls: ['product.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute,
        product_service_1.ProductService])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map