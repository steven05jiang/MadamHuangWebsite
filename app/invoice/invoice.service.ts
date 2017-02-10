import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Event } from '../common/event';
import { Config, Text } from '../common/config';
import { Invoice, InvoiceItem } from './invoice';

import { APIRequest } from '../common/api-request';
import { APIResponse } from '../common/api-response';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InvoiceService {

  message: string;
  size: number = Config.PAGE_NUM;
  statusChange: EventEmitter<({object:any, message:string})> = new EventEmitter();

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}


  // TODO: change get request to POST request using APIRequest
  // TODO: add token to the request
  getObjects(page: number, size: number, customerId: number): Promise<APIResponse> {
      let apiRequest = <APIRequest>({
          apiKey: '',
          operator: '',
          token: Config.getToken(),
          page: page,
          size: size,
          body: {
            id: customerId
          }
      });
      const url = Config.api_host + '/invoices';
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
  }

  // TODO: search/return one record by primary key using service.ts
  getObject(id: number): Promise<Invoice> {
    return this.getObjects(0, 1000, -1)
      .then(
        objects => (objects.body as Invoice[]).find(object => object.id == id)
      ).then(
        obj => {
          //obj.createdOn = formatDate(obj.createdOn);
          //obj.updatedOn = formatDate(obj.updatedOn);
          return obj;
        }
      )
      .catch((ex) => this.handleError(ex));
  }

  update(object: Invoice): Promise<Invoice> {

    const url = Config.api_host + '/edit-invoice';
    object.createdOn = formatDate(object.createdOn);
    object.updatedOn = (new Date().getTime()).toString();
    object.updatedOn = formatDate(object.updatedOn);


    let apiRequest = <APIRequest>({
      apiKey: '',
      operator: '',
      token: Config.getToken(),
      body: object
      });
      console.log(JSON.stringify(apiRequest));
      return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
        .toPromise()
        .then(
          response => {
            console.log(response);
            return response.json().body as Invoice;
          }
        )
        .catch((ex) => this.handleError(ex));
  }

  delete(object: Invoice): Promise<null> {
    const url = Config.api_host + '/delete-invoice';
    object.createdOn = formatDate(object.createdOn);

    object.updatedOn = (new Date().getTime()).toString();
    object.updatedOn = formatDate(object.updatedOn);
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

function toInvoice(response: any): Invoice {
  let object = <Invoice>({
    id: response.id,
    description: response.description
  });
  console.log('invoice: ' + object.description);
  return object;
}

function formatDate(secondStr: string): string {

  let date = new Date();
  let seconds = parseInt(secondStr);
  date.setTime(seconds);
  console.log("ISO Time String: " + date.toISOString());
  return date.toISOString();
}
