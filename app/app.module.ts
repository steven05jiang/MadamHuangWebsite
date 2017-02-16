import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from '@angular/forms';
import { RouterModule }           from '@angular/router';
import { HttpModule }             from '@angular/http';
import { AUTH_PROVIDERS }         from 'angular2-jwt';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }           from './app.component';

import { LoginComponent }       from './login/login.component';
import { LoginService }          from './login/login.service';

import { SignupComponent }       from './signup/signup.component';

import { AuthGuard }            from './common/auth.guard';

import { HomeComponent }       from './home/home.component';
import { AboutComponent }       from './about/about.component';
import { BeautyComponent }            from './beauty/beauty.component';
import { ContactComponent }            from './contact/contact.component';


import { ActivityComponent }            from './activity/activity.component';
import { ActivityService }            from './activity/activity.service';

import { ProductComponent }            from './product/product.component';
import { ProductService }            from './product/product.service';

import { ArticleComponent }            from './article/article.component';
import { ArticleService }            from './article/article.service';

import { ClassroomComponent }            from './classroom/classroom.component';

import { UserProfileComponent }  from './user/user-profile.component';
import { UserEditComponent }  from './user/user-edit.component';
import { ChangePasswordComponent }  from './user/user-change-password.component';

import { InvoiceDetailComponent }  from './invoice/invoice-detail.component';
import { InvoiceEditComponent }  from './invoice/invoice-edit.component';
import { InvoicesComponent }       from './invoice/invoices.component';
import { InvoiceService }          from './invoice/invoice.service';

import { MenuComponent }          from './menu/menu.component';
import { FooterComponent }          from './footer/footer.component';

import { CustomerDetailComponent }  from './customer/customer-detail.component';
import { CustomerEditComponent }  from './customer/customer-edit.component';
import { CustomersComponent }       from './customer/customers.component';
import { CustomerService }          from './customer/customer.service';

import { PaginationComponent}       from './ui/pagination.component';
import { AppRoutingModule }         from './app-routing.module';


import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';


import { ValueProvider} from '@angular/core';

const WINDOW_PROVIDER: ValueProvider = {
  provide: Window,
  useValue: window
}


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    MyDatePickerModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ActivityComponent,
    ArticleComponent,
    BeautyComponent,
    ProductComponent,
    ClassroomComponent,
    MenuComponent,
    FooterComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
    CustomersComponent,
    UserProfileComponent,
    UserEditComponent,
    ChangePasswordComponent,
    InvoiceDetailComponent,
    InvoiceEditComponent,
    InvoicesComponent,
    PaginationComponent
  ],
  providers: [
    AuthGuard,
    AUTH_PROVIDERS,
    LoginService,
    ArticleService,
    ProductService,
    CustomerService,
    InvoiceService,
    ActivityService,
    WINDOW_PROVIDER
  ],
  bootstrap: [
    AppComponent
  //  ,MenuComponent
  ]
})
export class AppModule { }
