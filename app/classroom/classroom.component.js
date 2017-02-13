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
var classroomType_1 = require("./classroomType");
var ClassroomComponent = (function () {
    function ClassroomComponent(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    ClassroomComponent.prototype.ngOnInit = function () {
        var _this = this;
        // getting parameter from route
        this.classroomType = new classroomType_1.ClassroomType();
        this.activatedRoute.params.forEach(function (params) {
            _this.classroom = _this.classroomType.map[params['name']];
        });
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
    __metadata("design:paramtypes", [router_1.Router,
        router_2.ActivatedRoute])
], ClassroomComponent);
exports.ClassroomComponent = ClassroomComponent;
//# sourceMappingURL=classroom.component.js.map