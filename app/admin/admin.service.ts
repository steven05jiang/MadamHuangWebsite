import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Config, Text } from '../common/config';

import { Router } from '@angular/router';

import { APIRequest } from '../common/api-request';
import { APIResponse } from '../common/api-response';

import { User } from '../user/user';
import { Article} from '../article/article';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminService {

  user: User;
  //status: Status;
  message: string;
  statusChange: EventEmitter<({object:any, message:string})> = new EventEmitter();

  constructor(private router: Router, private http: Http) {}

  private headers = new Headers({'Content-Type': 'application/json'});



  updateArticle(article: Article): Promise<APIResponse> {

    console.log('API Host: ' + Config.api_host);

    const url = Config.api_host + '/article-update';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: article
    });

    console.log(JSON.stringify(apiRequest));

    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
        console.log(response);
          let token = response.json().token;
          localStorage.setItem('token', token);
          return response.json() as APIResponse;
        }
      )
      .catch((ex) => this.handleError(ex));
  }

   addArticle(article: Article): Promise<APIResponse> {

    console.log('API Host: ' + Config.api_host);

    const url = Config.api_host + '/article-add';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: article
    });

    console.log(JSON.stringify(apiRequest));

    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
        console.log(response);
          let token = response.json().token;
          localStorage.setItem('token', token);
          return response.json() as APIResponse;
        }
      )
      .catch((ex) => this.handleError(ex));
  }

   deleteArticle(id:number): Promise<APIResponse> {
      let apiRequest = <APIRequest>({
          apiKey: '',
          operator: '',
          token: Config.getToken(),
          body: {'id':id}
      });
      const url = Config.api_host + '/article-delete';
      console.log(JSON.stringify(apiRequest));

      return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(response => {
          let token = response.json().token;
          localStorage.setItem('token', token);
          return response.json() as APIResponse;
        })
        .catch((ex) => this.handleError(ex));
  }

   getContacts(page: number, size: number): Promise<APIResponse> {
      let apiRequest = <APIRequest>({
          apiKey: '',
          operator: '',
          token: Config.getToken(),
          page: page,
          size: size
      });
      const url = Config.api_host + '/messages';
      console.log(JSON.stringify(apiRequest));

      return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(response => {
        let token = response.json().token;
        localStorage.setItem('token', token);
        return response.json() as APIResponse;
        })
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
