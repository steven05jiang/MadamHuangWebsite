import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';


import { LoginService }          from '../login/login.service';

 //https://github.com/auth0-blog/angular2-authentication-sample/blob/master/src/home/home.ts

@Injectable()
export class AuthGuard implements CanActivate {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate() {

    let jwt = localStorage.getItem('token');

    console.log("JWT: = " + jwt);
    //if (tokenNotExpired() || true) {
    if(jwt != null && jwt != '' && jwt != 'null'
      && !this.jwtHelper.isTokenExpired(jwt)) {

      //console.log("JWT-Decode: " + this.jwtHelper.decodeToken(jwt));
      console.log("JWT-Expiration Date: " + this.jwtHelper.getTokenExpirationDate(jwt));

      // TODO - client: validate JWT token and expiration
      // TODO - server: refresh and renew token
      this.loginService.refreshToken(jwt);

      return true;
    } else {

      this.router.navigate(['/login', 200]);
      return false;
    }
  }
}
