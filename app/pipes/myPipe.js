"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var IdDscdPipe = (function () {
    function IdDscdPipe() {
    }
    IdDscdPipe.prototype.transform = function (array, args) {
        //console.log(array.length);
        array.sort(function (a, b) {
            if (a.id < b.id) {
                return 1;
            }
            else if (a.id > b.id) {
                return -1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    return IdDscdPipe;
}());
IdDscdPipe = __decorate([
    core_1.Pipe({
        name: 'idDscd'
    })
], IdDscdPipe);
exports.IdDscdPipe = IdDscdPipe;
//# sourceMappingURL=myPipe.js.map