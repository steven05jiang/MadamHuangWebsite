import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Config, Text } from '../common/config';
import { Event } from '../common/event';

import { User } from './user';

import { APIRequest } from '../common/api-request';
import { APIResponse } from '../common/api-response';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  message: string;
  statusChange: EventEmitter<({object:any, message:string})> = new EventEmitter();

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}


  // TODO: change get request to POST request using APIRequest
  // TODO: add token to the request
  getObjects(page: number, size: number): Promise<APIResponse> {
      let apiRequest = <APIRequest>({
          apiKey: '',
          operator: '',
          token: Config.getToken(),
          page: page,
          size: size
      });
      const url = Config.api_host + '/users';
      console.log(JSON.stringify(apiRequest));

      return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(response => {
          if(response.json().code == '200') {
            return response.json() as APIResponse;
          } else {
            this.message = Text.val(500);
            this.emitStatusChangeEvent(null, this.message);
          }
        })
        .catch((ex) => this.handleError(ex));

      //return customers;
    //return Promise.resolve(CUSTOMERS);
  }

  getObject(id: number): Promise<User> {
    return this.getObjects(0, 1000)
      .then(
        //objects => objects.find(object => object.id == id)
        objects => (objects.body as User[]).find(object => object.id == id)
      );
  }


  update(object: User): Promise<User> {
    const url = Config.api_host + '/edit-user';

    object.lastlogOn = Config.formatDate(object.lastlogOn);
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: object
    });
    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
        .toPromise()
        //.then(() => object)
        .then(
          response => {
          console.log(response);
          return response.json().body as User;
          }
        )
        .catch((ex) => this.handleError(ex));
  }

  delete(object: User): Promise<null> {
    const url = Config.api_host + '/delete-user';
    object.lastlogOn = Config.formatDate(object.lastlogOn);
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: object
    });
    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
        response => {
          if(response.json().code != '200') {
            this.emitStatusChangeEvent(null, 'Failed');
          } else {
            this.emitStatusChangeEvent(new Event(Event.RELOAD), 'Delete Successful');
          }
        }
      )
    .catch((ex) => this.handleError(ex));
  }

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

function toUser(response: any): User {
  let object = <User>({
    id: response.id,
    username: response.username,
    password: response.password
  });
  console.log('customer: ' + object.username);
  return object;
}
