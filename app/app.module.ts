import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from '@angular/forms';
import { RouterModule }           from '@angular/router';
import { HttpModule }             from '@angular/http';
import { AUTH_PROVIDERS }         from 'angular2-jwt';

import { AppComponent }           from './app.component';

import { LoginComponent }       from './login/login.component';
import { LoginService }          from './login/login.service';

import { AuthGuard }            from './common/auth.guard';

import { HomeComponent }       from './home/home.component';
import { AboutComponent }       from './about/about.component';
import { ActivityComponent }            from './activity/activity.component';
import { BeautyComponent }            from './beauty/beauty.component';
import { ProductComponent }            from './product/product.component';
import { TestAPIComponent }            from './testAPI/testAPI.component';

import { UserDetailComponent }  from './user/user-detail.component';
import { UserEditComponent }  from './user/user-edit.component';
import { UsersComponent }       from './user/users.component';
import { UserService }          from './user/user.service';

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

import { ValueProvider} from '@angular/core'

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
    MyDatePickerModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    ActivityComponent,
    BeautyComponent,
    ProductComponent,
    TestAPIComponent,
    MenuComponent,
    FooterComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
    CustomersComponent,
    UserDetailComponent,
    UserEditComponent,
    UsersComponent,
    InvoiceDetailComponent,
    InvoiceEditComponent,
    InvoicesComponent,
    PaginationComponent
  ],
  providers: [
    AuthGuard,
    AUTH_PROVIDERS,
    LoginService,
    CustomerService,
    UserService,
    InvoiceService,
    WINDOW_PROVIDER
  ],
  bootstrap: [
    AppComponent
  //  ,MenuComponent
  ]
})
export class AppModule { }
