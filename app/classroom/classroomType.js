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
var classroom_1 = require("./classroom");
var core_1 = require("@angular/core");
var ClassroomType = (function () {
    function ClassroomType() {
        this.map = {};
        this.map['taste'] = new classroom_1.Classroom('taste', '審美課堂', '', '');
        this.map['insight'] = new classroom_1.Classroom('insight', '心美課堂', '', '');
        this.map['figure'] = new classroom_1.Classroom('figure', '體美課堂', '', '');
        this.map['skin'] = new classroom_1.Classroom('skin', '膚美課堂', '', '');
    }
    return ClassroomType;
}());
ClassroomType = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ClassroomType);
exports.ClassroomType = ClassroomType;
//# sourceMappingURL=classroomType.js.map