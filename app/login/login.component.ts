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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http) {

      this.loginUser = new User({
        username: '',
        password: ''
      });

      console.log('loginComponent: constructor called');
      this.message = this.loginService.message;
      this.subscription = this.loginService.getStatusChangeEmitter()
        .subscribe(($event:any) => {
          if($event.user) {
            this.user = $event.user;
            console.log('User exists');
            this.loginUser = this.user;
            this.router.navigate(['home']);
          }
          this.message = $event.message;

        } );
  }

  login() {
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
