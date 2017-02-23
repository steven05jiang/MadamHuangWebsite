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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var article_1 = require("../article/article");
var activity_1 = require("../activity/activity");
var classroom_item_1 = require("../classroom/classroom-item");
var product_1 = require("../product/product");
var article_service_1 = require("../article/article.service");
var product_service_1 = require("../product/product.service");
var activity_service_1 = require("../activity/activity.service");
var login_service_1 = require("../login/login.service");
var admin_service_1 = require("./admin.service");
var classroom_service_1 = require("../classroom/classroom.service");
var AdminComponent = (function () {
    function AdminComponent(adminService, loginService, articleService, activityService, classroomService, productService, http, router, activatedRoute) {
        var _this = this;
        this.adminService = adminService;
        this.loginService = loginService;
        this.articleService = articleService;
        this.activityService = activityService;
        this.classroomService = classroomService;
        this.productService = productService;
        this.http = http;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.adminHelper = {};
        this.adminHelper.articleEditMode = false;
        this.adminHelper.articleAddMode = false;
        this.adminHelper.articleMessage = '';
        this.adminHelper.articleSize = 10;
        this.adminHelper.articlePage = 0;
        this.adminHelper.articleTotalPage = 1;
        this.adminHelper.activityEditMode = false;
        this.adminHelper.activityAddMode = false;
        this.adminHelper.activityMessage = '';
        this.adminHelper.activitySize = 10;
        this.adminHelper.activityPage = 0;
        this.adminHelper.activityTotalPage = 1;
        this.adminHelper.classroomItemEditMode = false;
        this.adminHelper.classroomItemAddMode = false;
        this.adminHelper.classroomItemMessage = '';
        this.adminHelper.classroomItemSize = 10;
        this.adminHelper.classroomItemPage = 0;
        this.adminHelper.classroomItemTotalPage = 1;
        this.adminHelper.productEditMode = false;
        this.adminHelper.productAddMode = false;
        this.adminHelper.productMessage = '';
        this.adminHelper.productSize = 10;
        this.adminHelper.productPage = 0;
        this.adminHelper.productTotalPage = 1;
        this.adminHelper.contactSize = 10;
        this.adminHelper.contactPage = 0;
        this.adminHelper.contactTotalPage = 1;
        this.adminHelper.contactMessage = '';
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
        this.getArticles(this.adminHelper.articlePage);
        this.getContacts(this.adminHelper.contactPage);
        this.getActivities(this.adminHelper.activityPage);
        this.getProducts(this.adminHelper.productPage);
        this.getClassroomItems(this.adminHelper.classroomItemPage);
    };
    AdminComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AdminComponent.prototype.getArticles = function (page) {
        var _this = this;
        if (page < 0 || (this.adminHelper.articleTotalPage != null && page >= this.adminHelper.articleTotalPage)) {
            alert('No more articles.');
            return;
        }
        this.articleService.getArticles(page, this.adminHelper.articleSize).then(function (response) {
            //console.log(response);
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.articlePage = page;
                _this.adminHelper.articleTotalPage = response.totalPages;
                _this.articles = response.body;
            }
            else {
                _this.adminHelper.articleMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.editArticle = function () {
        this.adminHelper.articleEditMode = true;
    };
    AdminComponent.prototype.updateArticle = function (article) {
        var _this = this;
        if (article.createdDate != null) {
            article.createdDate = new Date(article.createdDate);
        }
        if (article.updatedDate != null) {
            article.updatedDate = new Date(article.updatedDate);
        }
        this.adminService.updateArticle(article).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.articleEditMode = false;
                _this.adminHelper.articleMessage = 'Seccessfully Update.';
                var index = _this.articles.indexOf(article);
                if (index !== -1) {
                    _this.articles[index] = response.body;
                }
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
    AdminComponent.prototype.exitEditArticle = function () {
        this.adminHelper.articleEditMode = false;
    };
    AdminComponent.prototype.newArticle = function () {
        this.articleNew = new article_1.Article();
        this.adminHelper.articleAddMode = !this.adminHelper.articleAddMode;
    };
    AdminComponent.prototype.resetNewArticle = function () {
        this.articleNew = new article_1.Article();
    };
    AdminComponent.prototype.getContacts = function (page) {
        var _this = this;
        if (page < 0 || (this.adminHelper.contactTotalPage != null && page >= this.adminHelper.contactTotalPage)) {
            alert('No more messages.');
            return;
        }
        this.adminService.getContacts(page, this.adminHelper.contactSize).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.contactPage = page;
                _this.adminHelper.contactTotalPage = response.totalPages;
                _this.contacts = response.body;
            }
            else {
                _this.adminHelper.contactMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.getActivities = function (page) {
        var _this = this;
        if (page < 0 || (this.adminHelper.activityTotalPage != null && page >= this.adminHelper.activityTotalPage)) {
            alert('No more articles.');
            return;
        }
        this.activityService.getActivities(page, this.adminHelper.activitySize).then(function (response) {
            //console.log(response);
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.activityPage = page;
                _this.adminHelper.activityTotalPage = response.totalPages;
                _this.activities = response.body;
            }
            else {
                _this.adminHelper.activityMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.editActivity = function () {
        this.adminHelper.activityEditMode = true;
    };
    AdminComponent.prototype.updateActivity = function (activity) {
        var _this = this;
        if (activity.createdDate != null) {
            activity.createdDate = new Date(activity.createdDate);
        }
        if (activity.startDate != null) {
            activity.startDate = new Date(activity.startDate);
        }
        if (activity.endDate != null) {
            activity.endDate = new Date(activity.endDate);
        }
        this.adminService.updateActivity(activity).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.activityEditMode = false;
                _this.adminHelper.activityMessage = 'Seccessfully Update.';
                var index = _this.activities.indexOf(activity);
                if (index !== -1) {
                    _this.activities[index] = response.body;
                }
            }
            else {
                _this.adminHelper.activityMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.addActivity = function (activity) {
        var _this = this;
        this.adminService.addActivity(activity).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.activityAddMode = false;
                _this.activityNew = null;
                _this.adminHelper.activityMessage = 'Seccessfully Update.';
                var object = response.body;
                _this.activities.unshift(object);
            }
            else {
                _this.adminHelper.activityMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.deleteActivity = function (activity) {
        var _this = this;
        if (confirm('確認刪除')) {
            this.adminService.deleteActivity(activity.id).then(function (response) {
                if (response.token == null) {
                    _this.loginService.signout();
                    return;
                }
                if (response.code == '200') {
                    var index = _this.activities.indexOf(activity);
                    _this.activities.splice(index, 1);
                }
                else {
                    _this.adminHelper.activityMessage = response.message;
                }
            });
        }
    };
    AdminComponent.prototype.exitEditActivity = function () {
        this.adminHelper.activityEditMode = false;
    };
    AdminComponent.prototype.newActivity = function () {
        this.activityNew = new activity_1.Activity();
        this.adminHelper.activityAddMode = !this.adminHelper.activityAddMode;
    };
    AdminComponent.prototype.resetNewActivity = function () {
        this.activityNew = new activity_1.Activity();
    };
    AdminComponent.prototype.getClassroomItems = function (page) {
        var _this = this;
        if (page < 0 || (this.adminHelper.classroomItemTotalPage != null && page >= this.adminHelper.classroomItemTotalPage)) {
            alert('No more classroom items.');
            return;
        }
        this.classroomService.getObjects(page, this.adminHelper.classroomItemSize).then(function (response) {
            //console.log(response);
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.classroomItemPage = page;
                _this.adminHelper.classroomItemTotalPage = response.totalPages;
                _this.classroomItems = response.body;
            }
            else {
                _this.adminHelper.classroomItemMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.editClassroomItem = function () {
        this.adminHelper.classroomItemEditMode = true;
    };
    AdminComponent.prototype.updateClassroomItem = function (classroomItem) {
        var _this = this;
        if (classroomItem.updatedDate != null) {
            classroomItem.updatedDate = new Date(classroomItem.updatedDate);
        }
        this.adminService.updateClassroomItem(classroomItem).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.classroomItemEditMode = false;
                _this.adminHelper.classroomItemMessage = 'Seccessfully Update.';
                var index = _this.classroomItems.indexOf(classroomItem);
                if (index !== -1) {
                    _this.classroomItems[index] = response.body;
                }
            }
            else {
                _this.adminHelper.classroomItemMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.addClassroomItem = function (classroomItem) {
        var _this = this;
        this.adminService.addClassroomItem(classroomItem).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.classroomItemAddMode = false;
                _this.classroomItemNew = null;
                _this.adminHelper.classroomItemMessage = 'Seccessfully Update.';
                var object = response.body;
                _this.classroomItems.unshift(object);
            }
            else {
                _this.adminHelper.classroomItemMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.deleteClassroomItem = function (classroomItem) {
        var _this = this;
        if (confirm('確認刪除')) {
            this.adminService.deleteClassroomItem(classroomItem.id).then(function (response) {
                if (response.token == null) {
                    _this.loginService.signout();
                    return;
                }
                if (response.code == '200') {
                    var index = _this.classroomItems.indexOf(classroomItem);
                    _this.classroomItems.splice(index, 1);
                }
                else {
                    _this.adminHelper.classroomItemMessage = response.message;
                }
            });
        }
    };
    AdminComponent.prototype.exitEditClassroomItem = function () {
        this.adminHelper.classroomItemEditMode = false;
    };
    AdminComponent.prototype.newClassroomItem = function () {
        this.classroomItemNew = new classroom_item_1.ClassroomItem();
        this.adminHelper.classroomItemAddMode = !this.adminHelper.classroomItemAddMode;
    };
    AdminComponent.prototype.resetNewClassroomItem = function () {
        this.classroomItemNew = new classroom_item_1.ClassroomItem();
    };
    AdminComponent.prototype.getProducts = function (page) {
        var _this = this;
        if (page < 0 || (this.adminHelper.productTotalPage != null && page >= this.adminHelper.productTotalPage)) {
            alert('No more products.');
            return;
        }
        this.productService.getObjects(page, this.adminHelper.activitySize).then(function (response) {
            //console.log(response);
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.productPage = page;
                _this.adminHelper.productTotalPage = response.totalPages;
                _this.products = response.body;
            }
            else {
                _this.adminHelper.productMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.editProduct = function () {
        this.adminHelper.productEditMode = true;
    };
    AdminComponent.prototype.updateProduct = function (product) {
        var _this = this;
        this.adminService.updateProduct(product).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.productEditMode = false;
                _this.adminHelper.productMessage = 'Seccessfully Update.';
                var index = _this.products.indexOf(product);
                if (index !== -1) {
                    _this.products[index] = response.body;
                }
            }
            else {
                _this.adminHelper.productMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.addProduct = function (product) {
        var _this = this;
        this.adminService.addProduct(product).then(function (response) {
            if (response.token == null) {
                _this.loginService.signout();
                return;
            }
            if (response.code == '200') {
                _this.adminHelper.productAddMode = false;
                _this.productNew = null;
                _this.adminHelper.productMessage = 'Seccessfully Update.';
                var object = response.body;
                _this.products.unshift(object);
            }
            else {
                _this.adminHelper.activityMessage = response.message;
            }
        });
    };
    AdminComponent.prototype.deleteProduct = function (product) {
        var _this = this;
        if (confirm('確認刪除')) {
            this.adminService.deleteProduct(product.id).then(function (response) {
                if (response.token == null) {
                    _this.loginService.signout();
                    return;
                }
                if (response.code == '200') {
                    var index = _this.products.indexOf(product);
                    _this.products.splice(index, 1);
                }
                else {
                    _this.adminHelper.productMessage = response.message;
                }
            });
        }
    };
    AdminComponent.prototype.exitEditProduct = function () {
        this.adminHelper.productEditMode = false;
    };
    AdminComponent.prototype.newProduct = function () {
        this.productNew = new product_1.Product();
        this.adminHelper.productAddMode = !this.adminHelper.productAddMode;
    };
    AdminComponent.prototype.resetNewProduct = function () {
        this.productNew = new product_1.Product();
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
        activity_service_1.ActivityService,
        classroom_service_1.ClassroomService,
        product_service_1.ProductService,
        http_1.Http,
        router_1.Router,
        router_1.ActivatedRoute])
], AdminComponent);
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map