import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from '@angular/forms';
import { RouterModule }           from '@angular/router';
import { HttpModule }             from '@angular/http';
import { AUTH_PROVIDERS }         from 'angular2-jwt';

import { AppComponent }           from './app.component';

import { LoginComponent }       from './login/login.component';
import { LoginService }          from './login/login.service';

import { SignupComponent }       from './signup/signup.component';

import { AuthGuard }            from './common/auth.guard';

import { HomeComponent }       from './home/home.component';
import { AboutComponent }       from './about/about.component';

import { AdminComponent }            from './admin/admin.component';
import { AdminService }            from './admin/admin.service';
import { IdDscdPipe }            from './pipes/myPipe';

import { ActivityComponent }            from './activity/activity.component';
import { ActivityService }            from './activity/activity.service';

import { ProductComponent }            from './product/product.component';
import { ProductService }            from './product/product.service';

import { ArticleComponent }            from './article/article.component';
import { ArticleService }            from './article/article.service';

import { ContactComponent }            from './contact/contact.component';
import { ContactService }            from './contact/contact.service';

import { ClassroomComponent }            from './classroom/classroom.component';
import { ClassroomService }            from './classroom/classroom.service';

import { PurchaseComponent }            from './purchase/purchase.component';
import { PurchaseService }            from './purchase/purchase.service';
import { PurchaseConfirmationComponent }            from './purchase/purchase-confirm.component';
import { PurchaseResultComponent }            from './purchase/purchase-result.component';

import { UserProfileComponent }  from './user/user-profile.component';
import { UserEditComponent }  from './user/user-edit.component';
import { ChangePasswordComponent }  from './user/user-change-password.component';
import { UserService } from './user/user.service'

import { MenuComponent }          from './menu/menu.component';
import { FooterComponent }          from './footer/footer.component';


import { AppRoutingModule }         from './app-routing.module';


//import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';
import { LazyLoadImageModule } from 'ng2-lazyload-image';

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
  LazyLoadImageModule
  ],
  declarations: [
  AppComponent,
  AdminComponent,
  LoginComponent,
  SignupComponent,
  HomeComponent,
  AboutComponent,
  ContactComponent,
  ActivityComponent,
  ArticleComponent,
  ProductComponent,
  ClassroomComponent,
  MenuComponent,
  FooterComponent,
  UserProfileComponent,
  UserEditComponent,
  ChangePasswordComponent,
  PurchaseComponent,
  PurchaseConfirmationComponent,
  PurchaseResultComponent,
  IdDscdPipe
  ],
  providers: [
  AuthGuard,
  AUTH_PROVIDERS,
  AdminService,
  LoginService,
  ContactService,
  ArticleService,
  ProductService,
  ClassroomService,
  ActivityService,
  PurchaseService,
  UserService,
  WINDOW_PROVIDER
  ],
  bootstrap: [
  AppComponent
  //  ,MenuComponent
  ]
})
export class AppModule { }
