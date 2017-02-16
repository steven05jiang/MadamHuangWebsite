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
var auth_guard_1 = require("./common/auth.guard");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var home_component_1 = require("./home/home.component");
var about_component_1 = require("./about/about.component");
var activity_component_1 = require("./activity/activity.component");
var beauty_component_1 = require("./beauty/beauty.component");
var product_component_1 = require("./product/product.component");
var contact_component_1 = require("./contact/contact.component");
var article_component_1 = require("./article/article.component");
var classroom_component_1 = require("./classroom/classroom.component");
var user_profile_component_1 = require("./user/user-profile.component");
var user_edit_component_1 = require("./user/user-edit.component");
var user_change_password_component_1 = require("./user/user-change-password.component");
var customer_detail_component_1 = require("./customer/customer-detail.component");
var customer_edit_component_1 = require("./customer/customer-edit.component");
var customers_component_1 = require("./customer/customers.component");
var invoice_detail_component_1 = require("./invoice/invoice-detail.component");
var invoice_edit_component_1 = require("./invoice/invoice-edit.component");
var invoices_component_1 = require("./invoice/invoices.component");
var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'activity', component: activity_component_1.ActivityComponent },
    { path: 'beauty', component: beauty_component_1.BeautyComponent },
    { path: 'product', component: product_component_1.ProductComponent },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: 'article/:id', component: article_component_1.ArticleComponent },
    { path: 'classroom/:name', component: classroom_component_1.ClassroomComponent },
    { path: 'profile', component: user_profile_component_1.UserProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'user-edit', component: user_edit_component_1.UserEditComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'user-change-password', component: user_change_password_component_1.ChangePasswordComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'customer-detail/:id', component: customer_detail_component_1.CustomerDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'customer-edit/:id', component: customer_edit_component_1.CustomerEditComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'customers', component: customers_component_1.CustomersComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'invoice-detail/:id', component: invoice_detail_component_1.InvoiceDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'invoice-edit/:id/:customer_id', component: invoice_edit_component_1.InvoiceEditComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'invoices/:customer_id', component: invoices_component_1.InvoicesComponent, canActivate: [auth_guard_1.AuthGuard] }
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
    }),
    __metadata("design:paramtypes", [])
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map