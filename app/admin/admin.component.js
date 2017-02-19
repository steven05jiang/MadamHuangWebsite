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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var article_1 = require("../article/article");
var article_service_1 = require("../article/article.service");
var login_service_1 = require("../login/login.service");
var admin_service_1 = require("./admin.service");
var AdminComponent = (function () {
    function AdminComponent(adminService, loginService, articleService, http, router, activatedRoute) {
        var _this = this;
        this.adminService = adminService;
        this.loginService = loginService;
        this.articleService = articleService;
        this.http = http;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.adminHelper = {};
        this.adminHelper.articleEditMode = false;
        this.adminHelper.articleAddMode = false;
        this.adminHelper.articleMessage = '';
        this.subscription = this.loginService.getStatusChangeEmitter()
            .subscribe(function ($event) {
            if (!$event.user) {
                _this.user == null;
                _this.router.navigate(['login']);
            }
            else if (!$event.user.isAdmin) {
                _this.user = $event.user;
                _this.router.navigate(['home']);
            }
            _this.message = $event.message;
        });
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.getArticles().then(function (response) {
            _this.articles = response.body;
        });
    };
    AdminComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AdminComponent.prototype.editArticle = function () {
        this.adminHelper.articleEditMode = true;
    };
    AdminComponent.prototype.updateArticle = function (article) {
        var _this = this;
        this.adminService.updateArticle(article).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.articleEditMode = false;
                _this.adminHelper.articleMessage = 'Seccessfully Update.';
            }
            else {
                _this.adminHelper.articleMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.addArticle = function (article) {
        var _this = this;
        this.adminService.addArticle(article).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.articleAddMode = false;
                _this.articleNew = null;
                _this.adminHelper.articleMessage = 'Seccessfully Update.';
                var object = response.body;
                _this.articles.unshift(object);
            }
            else {
                _this.adminHelper.articleMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.deleteArticle = function (article) {
        var _this = this;
        if (confirm('確認刪除')) {
            this.adminService.deleteArticle(article.id).then(function (response) {
                if (response.token == null) {
                    _this.loginService.signout();
                    return;
                }
                if (response.code == '200') {
                    var index = _this.articles.indexOf(article);
                    _this.articles.splice(index, 1);
                }
                else {
                    _this.adminHelper.articleMessage = response.message;
                }
            });
        }
    };
    AdminComponent.prototype.exitEdit = function () {
        this.adminHelper.articleEditMode = false;
    };
    AdminComponent.prototype.newArticle = function () {
        this.articleNew = new article_1.Article();
        this.adminHelper.articleAddMode = !this.adminHelper.articleAddMode;
    };
    AdminComponent.prototype.resetNewArticle = function () {
        this.articleNew = new article_1.Article();
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-admin',
        templateUrl: 'admin.component.html',
        styleUrls: ['admin.component.css']
    }),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        login_service_1.LoginService,
        article_service_1.ArticleService,
        http_1.Http,
        router_1.Router,
        router_1.ActivatedRoute])
], AdminComponent);
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map