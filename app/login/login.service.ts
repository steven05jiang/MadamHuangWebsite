import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Config, Text } from '../common/config';

import { Router } from '@angular/router';

import { APIRequest } from '../common/api-request';

import { User } from '../user/user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  user: User;
  //status: Status;
  message: string;
  statusChange: EventEmitter<({user:User, message:string})> = new EventEmitter();

  constructor(private router: Router, private http: Http) {}

  private headers = new Headers({'Content-Type': 'application/json'});

  signin(user: User): any {

    console.log('API Host: ' + Config.api_host);

    const url = Config.api_host + '/login';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: '',
        body: user
    });

    console.log(JSON.stringify(apiRequest));

    this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
        console.log(response);
          if(response.json().code == '200') {
            let token = response.json().token;
            localStorage.setItem('token', token);

            this.user = response.json().body as User;
            console.log('last log on: ' + this.user.lastlogOn + '  Token: ' + token);
            this.emitStatusChangeEvent(this.user, '');
            // response.json().body;
          } else {
            localStorage.setItem('token', '');
            //this.status = new Status();
            this.message = Text.val(100); //'Failed - invalid user name or password!';
            //this.message = 'Failed - invalid user name or password!';
            this.emitStatusChangeEvent(null, this.message);
          }
        }
      )
      .catch((ex) => this.handleError(ex));
  }

  signup(user: User): any {

    console.log('API Host: ' + Config.api_host);

    const url = Config.api_host + '/signup';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: '',
        body: user
    });

    console.log(JSON.stringify(apiRequest));

    this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
        console.log(response);
          if(response.json().code == '200') {
            let token = response.json().token;
            localStorage.setItem('token', token);

            this.user = response.json().body as User;
            console.log('last log on: ' + this.user.lastlogOn + '  Token: ' + token);
            this.emitStatusChangeEvent(this.user, '');
            // response.json().body;
          } else {
            localStorage.setItem('token', '');
            //this.status = new Status();
            this.message = Text.val(100); //'Failed - invalid user name or password!';
            //this.message = 'Failed - invalid user name or password!';
            this.emitStatusChangeEvent(null, this.message);
          }
        }
      )
      .catch((ex) => this.handleError(ex));
  }

  updateProfile(user: User): Promise<User> {

    console.log('API Host: ' + Config.api_host);

    const url = Config.api_host + '/user-update';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: user
    });

    console.log(JSON.stringify(apiRequest));

    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
        console.log(response);
          if(response.json().code == '200') {
            let token = response.json().token;
            localStorage.setItem('token', token);

            this.user = response.json().body as User;
            console.log('last log on: ' + this.user.lastlogOn + '  Token: ' + token);
            //this.emitStatusChangeEvent(this.user, '');
            return this.user;
            // response.json().body;
          } else if(response.json().code == '403'){
            localStorage.setItem('token', '');
            //this.status = new Status();
            this.user = null;
            this.message = Text.val(200); //'Failed - invalid user name or password!';
            //this.message = 'Failed - invalid user name or password!';
            this.emitStatusChangeEvent(null, this.message);
          } else {
             this.message = Text.val(500); //'Failed - invalid user name or password!';
            //this.message = 'Failed - invalid user name or password!';
            this.emitStatusChangeEvent(this.user, this.message);
          }
        }
      )
      .catch((ex) => this.handleError(ex));
  }

  changePassword(passwordHelper: any): Promise<User> {

    console.log('API Host: ' + Config.api_host);

    const url = Config.api_host + '/user-update-password';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: passwordHelper
    });

    console.log(JSON.stringify(apiRequest));

    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
        console.log(response);
          if(response.json().code == '200') {
            let token = response.json().token;
            localStorage.setItem('token', token);

            this.user = response.json().body as User;
            console.log('last log on: ' + this.user.lastlogOn + '  Token: ' + token);
            //this.emitStatusChangeEvent(this.user, '');
            return this.user;
            // response.json().body;
          } else if(response.json().code == '403'){
            localStorage.setItem('token', '');
            //this.status = new Status();
            this.user = null;
            this.message = Text.val(200); //'Failed - invalid user name or password!';
            //this.message = 'Failed - invalid user name or password!';
            this.emitStatusChangeEvent(null, this.message);
          } else {
             this.message = Text.val(500); //'Failed - invalid user name or password!';
            //this.message = 'Failed - invalid user name or password!';
            this.emitStatusChangeEvent(this.user, this.message);
          }
        }
      )
      .catch((ex) => this.handleError(ex));
  }

  onSubmit() {
     this.user = null;
    //this.emitStatusChangeEvent('You have successfully logged out!');
    this.message = "You have succesfully logged out!";
    this.emitStatusChangeEvent(null, this.message);
  }
  signout() {
    localStorage.setItem('token', '');
    this.user = null;
    //this.emitStatusChangeEvent('You have successfully logged out!');
    this.message = "You have succesfully logged out!";
    this.emitStatusChangeEvent(null, this.message);
  }

  refreshToken(myToken: string) {
    const url = Config.api_host + '/refresh-token';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: myToken,
        body: {}
    });
    this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
          if(response.json().code == '200') {
            let token = response.json().token;
            localStorage.setItem('token', token);
            this.user = response.json().body as User;

            // we use this to notify the menu component
            this.emitStatusChangeEvent(this.user, '');
          } else {
            localStorage.setItem('token', '');
            this.message = Text.val(100); //'Failed - invalid user name or password!';
            // TODO - the following logic is not used. Can be improved to handle ...
            this.emitStatusChangeEvent(null, this.message);
          }
        }
      )
      .catch((ex) => this.handleError(ex));

  }

  //private handleError(error: any): Promise<any> {
  private handleError(error: any) {
    this.emitStatusChangeEvent(null, Text.val(500));
    //return Promise.reject(error.message || error);
  }

  emitStatusChangeEvent(user: User, message: string) {
    this.statusChange.emit({user:user, message:message});
  }

  getStatusChangeEmitter() {
    return this.statusChange;
  }
}
