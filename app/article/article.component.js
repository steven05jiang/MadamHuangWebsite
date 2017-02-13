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
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var event_1 = require("../common/event");
var article_service_1 = require("./article.service");
var ArticleComponent = (function () {
    function ArticleComponent(router, activatedRoute, service) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.message = this.service.message;
        this.subscription = this.service.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object instanceof event_1.Event && $event.object.type == event_1.Event.RELOAD) {
                _this.ngOnInit();
            }
            _this.message = $event.message;
        });
    }
    ArticleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.forEach(function (params) {
            _this.id = +params['id'];
        });
        this.service.getObject(this.id).then(function (apiResponse) {
            _this.apiResponse = apiResponse;
            _this.article = apiResponse.body;
            console.log(_this.article);
        });
    };
    return ArticleComponent;
}());
ArticleComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-article',
        templateUrl: 'article.component.html',
        styleUrls: ['article.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute,
        article_service_1.ArticleService])
], ArticleComponent);
exports.ArticleComponent = ArticleComponent;
//# sourceMappingURL=article.component.js.map