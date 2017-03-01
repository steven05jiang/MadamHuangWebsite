import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Http } from '@angular/http';

import { Config, Text } from '../common/config';
import { contentHeaders } from '../common/headers';

import { LoginService }          from './login.service';
import { User }           from '../user/user';

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})


export class LoginComponent implements OnInit {

  user: User;
  loginUser: User;
  message: string;
  subscription: any;
  loginHelper: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http) {

      this.loginHelper = {};
      this.loginHelper.isWaiting = false;

      this.loginUser = new User();
      this.loginUser.username = '';
      this.loginUser.password = '';

      console.log('loginComponent: constructor called');
      this.message = this.loginService.message;
      this.subscription = this.loginService.getStatusChangeEmitter()
        .subscribe(($event:any) => {
          if($event.user) {
            this.user = $event.user;
            this.loginUser = this.user;
            this.router.navigate(['']);
          }
          this.loginHelper.isWaiting = false;
          this.message = $event.message;

        } );
  }

  login() {
    this.clearMessage();
    this.loginHelper.isWaiting = true;
    this.loginService.signin(this.loginUser);
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
