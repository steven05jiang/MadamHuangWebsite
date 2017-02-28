"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var login_service_1 = require("./login/login.service");
var signup_component_1 = require("./signup/signup.component");
var auth_guard_1 = require("./common/auth.guard");
var home_component_1 = require("./home/home.component");
var about_component_1 = require("./about/about.component");
var admin_component_1 = require("./admin/admin.component");
var admin_service_1 = require("./admin/admin.service");
var myPipe_1 = require("./pipes/myPipe");
var activity_component_1 = require("./activity/activity.component");
var activity_service_1 = require("./activity/activity.service");
var product_component_1 = require("./product/product.component");
var product_service_1 = require("./product/product.service");
var article_component_1 = require("./article/article.component");
var article_service_1 = require("./article/article.service");
var contact_component_1 = require("./contact/contact.component");
var contact_service_1 = require("./contact/contact.service");
var classroom_component_1 = require("./classroom/classroom.component");
var classroom_service_1 = require("./classroom/classroom.service");
var purchase_component_1 = require("./purchase/purchase.component");
var purchase_service_1 = require("./purchase/purchase.service");
var purchase_confirm_component_1 = require("./purchase/purchase-confirm.component");
var purchase_result_component_1 = require("./purchase/purchase-result.component");
var user_profile_component_1 = require("./user/user-profile.component");
var user_edit_component_1 = require("./user/user-edit.component");
var user_change_password_component_1 = require("./user/user-change-password.component");
var menu_component_1 = require("./menu/menu.component");
var footer_component_1 = require("./footer/footer.component");
var app_routing_module_1 = require("./app-routing.module");
//import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';
var ng2_lazyload_image_1 = require("ng2-lazyload-image");
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
            ng2_lazyload_image_1.LazyLoadImageModule
        ],
        declarations: [
            app_component_1.AppComponent,
            admin_component_1.AdminComponent,
            login_component_1.LoginComponent,
            signup_component_1.SignupComponent,
            home_component_1.HomeComponent,
            about_component_1.AboutComponent,
            contact_component_1.ContactComponent,
            activity_component_1.ActivityComponent,
            article_component_1.ArticleComponent,
            product_component_1.ProductComponent,
            classroom_component_1.ClassroomComponent,
            menu_component_1.MenuComponent,
            footer_component_1.FooterComponent,
            user_profile_component_1.UserProfileComponent,
            user_edit_component_1.UserEditComponent,
            user_change_password_component_1.ChangePasswordComponent,
            purchase_component_1.PurchaseComponent,
            purchase_confirm_component_1.PurchaseConfirmationComponent,
            purchase_result_component_1.PurchaseResultComponent,
            myPipe_1.IdDscdPipe
        ],
        providers: [
            auth_guard_1.AuthGuard,
            angular2_jwt_1.AUTH_PROVIDERS,
            admin_service_1.AdminService,
            login_service_1.LoginService,
            contact_service_1.ContactService,
            article_service_1.ArticleService,
            product_service_1.ProductService,
            classroom_service_1.ClassroomService,
            activity_service_1.ActivityService,
            purchase_service_1.PurchaseService,
            WINDOW_PROVIDER
        ],
        bootstrap: [
            app_component_1.AppComponent
            //  ,MenuComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map