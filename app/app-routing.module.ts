import { NgModule}                  from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { AuthGuard }                from './common/auth.guard';
import { LoginComponent }           from './login/login.component';
import { SignupComponent }       from './signup/signup.component';
import { HomeComponent }            from './home/home.component';
import { AboutComponent }            from './about/about.component';
import { ActivityComponent }            from './activity/activity.component';
import { ProductComponent }            from './product/product.component';
import { ContactComponent }            from './contact/contact.component';
import { PurchaseComponent }            from './purchase/purchase.component';
import { PurchaseConfirmationComponent }            from './purchase/purchase-confirm.component';
import { PurchaseResultComponent }            from './purchase/purchase-result.component';

import { AdminComponent }            from './admin/admin.component';

import { ArticleComponent }            from './article/article.component';

import { ClassroomComponent }            from './classroom/classroom.component';

import { UserProfileComponent }  from './user/user-profile.component';
import { UserEditComponent }  from './user/user-edit.component';
import { ChangePasswordComponent }  from './user/user-change-password.component';


const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  //{ path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'activity', component: ActivityComponent},
  { path: 'product', component: ProductComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'purchase/product/:id', component: PurchaseComponent},
  { path: 'purchase/activity/:id', component: PurchaseComponent},
  { path: 'purchase/confirmation', component: PurchaseConfirmationComponent, canActivate: [AuthGuard]},
  { path: 'purchase/result/:status', component: PurchaseResultComponent, canActivate: [AuthGuard]},

  { path: 'article/:id', component: ArticleComponent},
  //{ path: 'classroom/:name', component: ClassroomComponent},
  { path: 'classroom', component: ClassroomComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'user-edit', component: UserEditComponent, canActivate: [AuthGuard]},
  { path: 'user-change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
