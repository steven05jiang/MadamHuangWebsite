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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var login_service_1 = require("./login/login.service");
var auth_guard_1 = require("./common/auth.guard");
var home_component_1 = require("./home/home.component");
var about_component_1 = require("./about/about.component");
var activity_component_1 = require("./activity/activity.component");
var beauty_component_1 = require("./beauty/beauty.component");
var product_component_1 = require("./product/product.component");
var testAPI_component_1 = require("./testAPI/testAPI.component");
var user_detail_component_1 = require("./user/user-detail.component");
var user_edit_component_1 = require("./user/user-edit.component");
var users_component_1 = require("./user/users.component");
var user_service_1 = require("./user/user.service");
var invoice_detail_component_1 = require("./invoice/invoice-detail.component");
var invoice_edit_component_1 = require("./invoice/invoice-edit.component");
var invoices_component_1 = require("./invoice/invoices.component");
var invoice_service_1 = require("./invoice/invoice.service");
var menu_component_1 = require("./menu/menu.component");
var customer_detail_component_1 = require("./customer/customer-detail.component");
var customer_edit_component_1 = require("./customer/customer-edit.component");
var customers_component_1 = require("./customer/customers.component");
var customer_service_1 = require("./customer/customer.service");
var pagination_component_1 = require("./ui/pagination.component");
var app_routing_module_1 = require("./app-routing.module");
var my_date_picker_module_1 = require("mydatepicker/dist/my-date-picker.module");
var WINDOW_PROVIDER = {
    provide: Window,
    useValue: window
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule,
            my_date_picker_module_1.MyDatePickerModule
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            home_component_1.HomeComponent,
            about_component_1.AboutComponent,
            activity_component_1.ActivityComponent,
            beauty_component_1.BeautyComponent,
            product_component_1.ProductComponent,
            testAPI_component_1.TestAPIComponent,
            menu_component_1.MenuComponent,
            customer_detail_component_1.CustomerDetailComponent,
            customer_edit_component_1.CustomerEditComponent,
            customers_component_1.CustomersComponent,
            user_detail_component_1.UserDetailComponent,
            user_edit_component_1.UserEditComponent,
            users_component_1.UsersComponent,
            invoice_detail_component_1.InvoiceDetailComponent,
            invoice_edit_component_1.InvoiceEditComponent,
            invoices_component_1.InvoicesComponent,
            pagination_component_1.PaginationComponent
        ],
        providers: [
            auth_guard_1.AuthGuard,
            angular2_jwt_1.AUTH_PROVIDERS,
            login_service_1.LoginService,
            customer_service_1.CustomerService,
            user_service_1.UserService,
            invoice_service_1.InvoiceService,
            WINDOW_PROVIDER
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map