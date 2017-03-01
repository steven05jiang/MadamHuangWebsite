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
  selector: 'my-signup',
  templateUrl: 'signup.component.html',
  styleUrls: [ 'signup.component.css' ]
})


export class SignupComponent implements OnInit {

  user: User;
  newUser: User;
  passwordHelper:	any;
  message: string;
  subscription: any;
  signupHelper: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http) {

      this.newUser = <User>({
        username: '',
        password: ''
      });

      this.passwordHelper = {};
      this.passwordHelper.confirmPassword = '';
      this.signupHelper = {};
      this.signupHelper.isWaiting = false;

      //console.log('loginComponent: constructor called');
      this.subscription = this.loginService.getStatusChangeEmitter()
        .subscribe(($event:any) => {
          if($event.user) {
            this.user = $event.user;
            this.newUser = this.user;
            this.router.navigate(['']);
          }
          this.signupHelper.isWaiting = false;
          this.message = $event.message;
        } );
  }

  signup() {
  	if(this.newUser.password != this.passwordHelper.confirmPassword) {
  		this.message = '輸入密碼不一致';
  	}else {
      this.signupHelper.isWaiting = true;
    	this.loginService.signup(this.newUser);
    }
  }

  clearMessage() {
    this.message = '';
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
