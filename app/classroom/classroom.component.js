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
var classroom_service_1 = require("./classroom.service");
var ClassroomComponent = (function () {
    function ClassroomComponent(classroomService, router, activatedRoute) {
        var _this = this;
        this.classroomService = classroomService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.size = 9;
        this.defaultImage = 'image/loading.png';
        //this.classroom = new Classroom('', '美麗課堂','','');
        this.curPage = 0;
        this.message = this.classroomService.message;
        this.subscription = this.classroomService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object instanceof event_1.Event && $event.object.type == event_1.Event.RELOAD) {
                //this.ngOnInit();
            }
            _this.message = $event.message;
        });
    }
    ClassroomComponent.prototype.ngOnInit = function () {
        // getting parameter from route
        /*
        this.classroomType = new ClassroomType();
        this.activatedRoute.params.forEach((params: Params) => {
        this.classroom = this.classroomType.map[params['name']];
        */
        //})
        this.getArticles(this.curPage);
    };
    ClassroomComponent.prototype.getArticles = function (page) {
        var _this = this;
        this.classroomService.getObjects(page, this.size).then(function (apiResponse) {
            _this.totalPage = apiResponse.totalPages;
            _this.items = apiResponse.body;
        });
    };
    ClassroomComponent.prototype.openArticle = function (classroomItem) {
        console.log('Ready to nav to article ' + classroomItem.articleId);
        this.router.navigate(['/article', classroomItem.articleId]);
    };
    ClassroomComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return ClassroomComponent;
}());
ClassroomComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-classroom',
        templateUrl: 'classroom.component.html',
        styleUrls: ['classroom.component.css']
    }),
    __metadata("design:paramtypes", [classroom_service_1.ClassroomService,
        router_1.Router,
        router_2.ActivatedRoute])
], ClassroomComponent);
exports.ClassroomComponent = ClassroomComponent;
//# sourceMappingURL=classroom.component.js.map