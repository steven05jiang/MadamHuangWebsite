import { Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
    moduleId: module.id,
    selector: 'my-about',
    templateUrl: 'about.component.html',
    styleUrls: [ 'about.component.css' ]
})

export class AboutComponent {

  jwtHelper: JwtHelper = new JwtHelper();
  jwt: string;
  decodedJwt: string;

  constructor() {
      this.jwt = localStorage.getItem('token');
      //console.log(
      //  this.jwtHelper.decodeToken(this.jwt).sub,
      //  this.jwtHelper.getTokenExpirationDate(this.jwt),
      //  this.jwtHelper.isTokenExpired(this.jwt)
      //);
  }
}
