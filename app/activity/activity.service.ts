import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Event } from '../common/event';
import { Config, Text } from '../common/config';
import { Activity } from './activity';

import { APIRequest } from '../common/api-request';
import { APIResponse } from '../common/api-response';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {

  message: string;
  size: number = Config.PAGE_NUM;
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
      const url = Config.api_host + '/activities';
      console.log(JSON.stringify(apiRequest));

      return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(response => {
        let token = response.json().token;
        localStorage.setItem('token', token);
          if(response.json().code == '200') {
            return response.json() as APIResponse;
          } else {
            this.message = Text.val(500);
            this.emitStatusChangeEvent(null, this.message);
          }
        })
        .catch((ex) => this.handleError(ex));
  }

  // TODO: search/return one record by primary key using service.ts
  getObject(id: number): Promise<Activity> {
    return this.getObjects(0, 1000)
      .then(
        objects => (objects.body as Activity[]).find(object => object.id == id)
      ).then(
        obj => {
          return obj;
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

