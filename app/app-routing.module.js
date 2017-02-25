"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./common/auth.guard");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var home_component_1 = require("./home/home.component");
var about_component_1 = require("./about/about.component");
var activity_component_1 = require("./activity/activity.component");
var product_component_1 = require("./product/product.component");
var contact_component_1 = require("./contact/contact.component");
var payment_component_1 = require("./payment/payment.component");
var admin_component_1 = require("./admin/admin.component");
var article_component_1 = require("./article/article.component");
var classroom_component_1 = require("./classroom/classroom.component");
var user_profile_component_1 = require("./user/user-profile.component");
var user_edit_component_1 = require("./user/user-edit.component");
var user_change_password_component_1 = require("./user/user-change-password.component");
var routes = [
    //{ path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '', component: home_component_1.HomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    //{ path: 'home', component: HomeComponent},
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'activity', component: activity_component_1.ActivityComponent },
    { path: 'product', component: product_component_1.ProductComponent },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: 'payment', component: payment_component_1.PaymentComponent },
    { path: 'article/:id', component: article_component_1.ArticleComponent },
    //{ path: 'classroom/:name', component: ClassroomComponent},
    { path: 'classroom', component: classroom_component_1.ClassroomComponent },
    { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'profile', component: user_profile_component_1.UserProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'user-edit', component: user_edit_component_1.UserEditComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'user-change-password', component: user_change_password_component_1.ChangePasswordComponent, canActivate: [auth_guard_1.AuthGuard] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map