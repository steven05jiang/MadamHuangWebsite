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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var contact_1 = require("../contact/contact");
var contact_service_1 = require("../contact/contact.service");
var http_1 = require("@angular/http");
//declare var jQuery:JQueryStatic;
var HomeComponent = (function () {
    function HomeComponent(contactService, http, document
        //private window: Window
    ) {
        var _this = this;
        this.contactService = contactService;
        this.http = http;
        this.document = document;
        this.animationHelper = {};
        this.animationHelper.badge1 = false;
        this.animationHelper.badge2 = false;
        this.animationHelper.badge3 = false;
        this.animationHelper.badge4 = false;
        this.animationHelper.beauty = false;
        this.animationHelper.about = false;
        this.animationHelper.isBadgeAnimate = false;
        this.msg = new contact_1.Message();
        this.subscription = this.contactService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if ($event.object != null) {
                _this.msg = new contact_1.Message();
            }
            _this.message = $event.message;
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        //setTimeout(() => {this.addBeautyAnimation()}, 500);
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    HomeComponent.prototype.addBeautyAnimation = function () {
        this.animationHelper.beauty = true;
    };
    //@HostListener('window:scroll', []) 
    HomeComponent.prototype.listenScrollAnimation = function () {
        var _this = this;
        var height = window.innerHeight;
        if (!this.animationHelper.isBadgeAnimate && this.badge1.nativeElement.getBoundingClientRect().top < height) {
            this.animationHelper.isBadgeAnimate = true;
            this.animationHelper.badge1 = true;
            this.timer = setInterval(function () {
                _this.addBadgeAnimation();
            }, 1000);
        }
        if (this.about.nativeElement.getBoundingClientRect().top < height) {
            this.animationHelper.about = true;
        }
    };
    HomeComponent.prototype.addBadgeAnimation = function () {
        if (!this.animationHelper.badge2) {
            this.animationHelper.badge2 = true;
        }
        else if (!this.animationHelper.badge3) {
            this.animationHelper.badge3 = true;
        }
        else if (!this.animationHelper.badge4) {
            this.animationHelper.badge4 = true;
            clearInterval(this.timer);
        }
    };
    HomeComponent.prototype.clearMessage = function () {
        this.message = '';
    };
    HomeComponent.prototype.onSubmit = function () {
        this.contactService.sendMessage(this.msg);
    };
    return HomeComponent;
}());
__decorate([
    core_1.ViewChild('badge1'),
    __metadata("design:type", core_1.ElementRef)
], HomeComponent.prototype, "badge1", void 0);
__decorate([
    core_1.ViewChild('about'),
    __metadata("design:type", core_1.ElementRef)
], HomeComponent.prototype, "about", void 0);
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-home',
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.css']
    }),
    __param(2, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [contact_service_1.ContactService,
        http_1.Http,
        Document
        //private window: Window
    ])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map