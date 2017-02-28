import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Event } from '../common/event';
import { Config, Text } from '../common/config';

import { APIRequest } from '../common/api-request';
import { APIResponse } from '../common/api-response';

import { SquareCharge } from './purchase';
import { ProductInfo } from './purchase';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PurchaseService {

  //purchaseObject:  any;
  //productInfo: ProductInfo;
  //squareCharge: SquareCharge;
  //isRefresh : boolean;
  serviceHelper : any;

  message: string;
  statusChange: EventEmitter<({object:any, message:string})> = new EventEmitter();

  private headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});

  constructor(private http: Http) {
    this.serviceHelper = {};
    this.serviceHelper.isRefresh = true;
    this.serviceHelper.squareCharge = null;
    this.serviceHelper.productInfo = null;
    this.serviceHelper.purchaseObject = null;
    this.serviceHelper.receiverName = null;
    this.serviceHelper.cardData = {};
    this.serviceHelper.result = null;
    this.serviceHelper.purchaseCategory = null;
  }

  sendPurchase(charge: SquareCharge, info: ProductInfo): Promise<APIResponse> {
      let apiRequest = <APIRequest>({
          apiKey: '',
          operator: '',
          token: Config.getToken(),
          body: {
          	'charge': charge,
          	'info': info
          }
      });
      const url = Config.api_host + '/purchase';
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

