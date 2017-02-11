import { NgModule}                  from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { AuthGuard }                from './common/auth.guard';
import { LoginComponent }           from './login/login.component';
import { HomeComponent }            from './home/home.component';
import { AboutComponent }            from './about/about.component';
import { ActivityComponent }            from './activity/activity.component';
import { BeautyComponent }            from './beauty/beauty.component';
import { ProductComponent }            from './product/product.component';
import { TestAPIComponent }            from './testAPI/testAPI.component';

import { CustomerDetailComponent }  from './customer/customer-detail.component';
import { CustomerEditComponent }  from './customer/customer-edit.component';
import { CustomersComponent }       from './customer/customers.component';

import { UserDetailComponent }  from './user/user-detail.component';
import { UserEditComponent }  from './user/user-edit.component';
import { UsersComponent }       from './user/users.component';

import { InvoiceDetailComponent }  from './invoice/invoice-detail.component';
import { InvoiceEditComponent }  from './invoice/invoice-edit.component';
import { InvoicesComponent }       from './invoice/invoices.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'activity', component: ActivityComponent},
  { path: 'beauty', component: BeautyComponent},
  { path: 'product', component: ProductComponent},
  { path: 'test', component: TestAPIComponent},


  { path: 'customer-detail/:id', component: CustomerDetailComponent, canActivate: [AuthGuard] },
  { path: 'customer-edit/:id', component: CustomerEditComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },

  { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },

  { path: 'invoice-detail/:id', component: InvoiceDetailComponent, canActivate: [AuthGuard] },
  { path: 'invoice-edit/:id/:customer_id', component: InvoiceEditComponent, canActivate: [AuthGuard] },
  { path: 'invoices/:customer_id', component: InvoicesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
