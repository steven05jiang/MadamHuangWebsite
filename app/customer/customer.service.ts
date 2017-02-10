import { Injectable,EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Event } from '../common/event';
import { Config, Text } from '../common/config';
import { APIRequest } from '../common/api-request';
import { APIResponse } from '../common/api-response';

import { Customer } from './customer';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService {

  message: string;
  statusChange: EventEmitter<({object:any, message:string})> = new EventEmitter();

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
      const url = Config.api_host + '/customers';
      console.log(JSON.stringify(apiRequest));

      return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(
          response =>
          {
          console.log(response);
            if(response.json().code == '200') {
              return response.json() as APIResponse
            } else {
              this.message = Text.val(500);
              this.emitStatusChangeEvent(null, this.message);
            }
          }
        )
      .catch((ex) => this.handleError(ex));

  }

  // TODO: current approach read all objects from backend
  // TODO: future: read a single selection of record from backend
  getObject(id: number): Promise<Customer> {
    return this.getObjects(0, 1000)
      .then(
        objects => (objects.body as Customer[]).find(object => object.id == id)
      )
      .catch((ex) => this.handleError(ex));
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(object: Customer): Promise<Customer> {
    const url = Config.api_host + '/edit-customer';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: object
    });
    console.log(JSON.stringify(apiRequest));
    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      //.then(() => object)
      .then(
        response => {
        console.log(response);
        return response.json().body as Customer
        }
      )
    .catch((ex) => this.handleError(ex));
  }

  delete(object: Customer): Promise<null> {
    const url = Config.api_host + '/delete-customer';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: object
    });
    console.log(JSON.stringify(apiRequest));
    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      //.then(() => object)
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

  add(object: Customer): Promise<Customer> {
    const url = Config.api_host + '/create-customer';
    let apiRequest = <APIRequest>({
        apiKey: '',
        operator: '',
        token: Config.getToken(),
        body: object
    });
    console.log(JSON.stringify(apiRequest));
    return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      //.then(() => object)
      .then(
        response => {
        console.log(response);
        return response.json().body as Customer
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

function toCustomer(response: any): Customer {
  let customer = <Customer>({
    id: response.id,
    firstName: response.firstName,
    lastName: response.lastName,
    description: response.description
  })
  console.log("customer: " + customer.firstName);
  return customer;
}

function toAPIResponse(response: any): APIResponse {
  let apiResponse = <APIResponse>({
    code: response.code,
    message: response.message,
    token: response.token,
    body: response.body.map(toCustomer),
    totalPages: response.totalPages,
    totalElements: response.totalElements,
    last: response.last,
    first: response.first,
    number: response.number,
    numberOfElements: response.numberOfElements,
    sort: response.sort
  })
  //console.log("customer: " + customer.firstName);
  return apiResponse;
}
