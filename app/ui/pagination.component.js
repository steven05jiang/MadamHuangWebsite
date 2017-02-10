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
// Menu Component
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.total = 0; // total pages
        this.page = 0; // current/selected page
        this.size = 0; // # of elements per page
        this.pageChanged = new core_1.EventEmitter();
        this.pages = new Array();
        console.log("page: " + this.page + ", size: " + this.size + ", Total: " + this.total);
    }
    PaginationComponent.prototype.ngOnInit = function () {
        console.log("ngOnInit() => page: " + this.page + ", size: " + this.size + ", Total: " + this.total);
        console.log("Pages: 2 - " + this.pages.length);
        this.pages = new Array(this.total);
        for (var pg = 0; pg < this.total; pg++) {
            this.pages.push({ page: pg, current: (pg == this.page) });
        }
        console.log("Pages: 3 - " + this.pages.length);
    };
    PaginationComponent.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
            //event.defaultPrevented;
            this.page = page;
        }
        this.pageChanged.emit({ page: this.page, size: this.size });
        //this.pageChanged.emit('this is a test emitter');
    };
    return PaginationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "total", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "page", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "size", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PaginationComponent.prototype, "pageChanged", void 0);
PaginationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "my-pagination",
        templateUrl: 'pagination.component.html',
        styleUrls: ['pagination.component.css']
    }),
    __metadata("design:paramtypes", [])
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map