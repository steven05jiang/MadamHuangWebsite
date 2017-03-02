import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Http } from '@angular/http';

import { Config, Text } from '../common/config';
import { contentHeaders } from '../common/headers';

import { LoginService }          from '../login/login.service';
import { User }           from '../user/user';

@Component({
  moduleId: module.id,
  selector: 'my-change-password',
  templateUrl: 'user-change-password.component.html',
  styleUrls: [ 'user-change-password.component.css' ]
})


export class ChangePasswordComponent implements OnInit {

  user: User;
  passwordHelper:  any;
  message: string;
  subscription: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http) {

      //console.log('loginComponent: constructor called');
      this.passwordHelper = {};
      this.passwordHelper.isWaiting = false;
      this.passwordHelper.oldPassword = '';
      this.passwordHelper.confirmPassword = '';
      this.passwordHelper.newPassword = '';
      this.message = this.loginService.message;
      this.subscription = this.loginService.getStatusChangeEmitter()
        .subscribe(($event:any) => {
          if($event.user) {
            this.user = $event.user;
            this.passwordHelper.username = this.user.username;
          }else{
            this.router.navigate(['login']);
          }
          this.passwordHelper.isWaiting = false;
          this.message = $event.message;
        } );
  }

  onSubmit() {
    if(this.passwordHelper.newPassword != this.passwordHelper.confirmPassword) {
      this.message = '輸入密碼不一致';
    }else {
      this.passwordHelper.isWaiting = true;
      this.loginService.changePassword(this.passwordHelper).then(
        user => this.router.navigate(['/profile'])
      );
    }
  }
  onCancel() {
    this.router.navigate(['/profile'])
  }

  clearMessage() {
    this.message = '';
  }

  ngOnInit(): void {
    // this.activatedRoute.params.forEach((params: Params) => {
    //   let code = +params['code'];
    //   this.message = Text.val(code); //code.toString();
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
