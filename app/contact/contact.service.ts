import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Config, Text } from '../common/config';

import { Router } from '@angular/router';

import { APIRequest } from '../common/api-request';
import { APIResponse } from '../common/api-response';

import { Message } from '../contact/contact';
import { User } from '../user/user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {

  msg: Message;
  //status: Status;
  message: string;
  statusChange: EventEmitter<({object:any, message:string})> = new EventEmitter();

  constructor(private router: Router, private http: Http) {}

  private headers = new Headers({'Content-Type': 'application/json'});

  sendMessage(msg: Message): void {

  	this.msg = msg;
    const url = Config.api_host + '/send-message';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: '',
        body: msg
    });

    //console.log(JSON.stringify(apiRequest));

    this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
        //console.log(response);
          if(response.json().code == '200') {
            this.emitStatusChangeEvent(this.msg, response.json().message);
            // response.json().body;
          } else {
            this.emitStatusChangeEvent(null, response.json().message);
          }
        }
      )
      .catch((ex) => this.handleError(ex));
  }

  getMessages(user: User): Promise<APIResponse> {

    //console.log('API Host: ' + Config.api_host);

    const url = Config.api_host + '/messages';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: user
    });

    //console.log(JSON.stringify(apiRequest));

    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
        //console.log(response);
          if(response.json().code == '200') {
            let token = response.json().token;
            localStorage.setItem('token', token);
            return response.json() as APIResponse;
          } else {
            localStorage.setItem('token', '');
            this.emitStatusChangeEvent(null, response.json().message);
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

  emitStatusChangeEvent(object: any, message: string) {
    this.statusChange.emit({object:object, message:message});
  }

  getStatusChangeEmitter() {
    return this.statusChange;
  }
}
