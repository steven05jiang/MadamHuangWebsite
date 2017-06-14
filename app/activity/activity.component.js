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
var activity_service_1 = require("./activity.service");
var ActivityComponent = (function () {
    function ActivityComponent(router, activatedRoute, service) {
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
    ActivityComponent.prototype.ngOnInit = function () {
        this.getActivities(this.page);
    };
    ActivityComponent.prototype.getActivities = function (page) {
        var _this = this;
        this.service.getActivities(page, this.size).then(function (apiResponse) {
            _this.apiResponse = apiResponse;
            _this.objects = apiResponse.body;
        });
    };
    ActivityComponent.prototype.openArticle = function (activity) {
        //console.log('Ready to nav to article '+activity.articleId);
        this.router.navigate(['/article', activity.articleId]);
    };
    ActivityComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ActivityComponent.prototype.openPurchase = function (activity) {
        this.router.navigate(['/purchase/activity/', activity.id]);
    };
    ActivityComponent.prototype.openPurchaseMember = function () {
        this.router.navigate(['/purchase/product/', '1']);
    };
    return ActivityComponent;
}());
ActivityComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-activity',
        templateUrl: 'activity.component.html',
        styleUrls: ['activity.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute,
        activity_service_1.ActivityService])
], ActivityComponent);
exports.ActivityComponent = ActivityComponent;
//# sourceMappingURL=activity.component.js.map