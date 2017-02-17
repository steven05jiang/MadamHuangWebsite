import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Event } from '../common/event';
import { Config, Text } from '../common/config';
import { Article } from './article';

import { APIRequest } from '../common/api-request';
import { APIResponse } from '../common/api-response';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService {

  message: string;
  size: number = Config.PAGE_NUM;
  statusChange: EventEmitter<({article:Article, message:string})> = new EventEmitter();

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}


  // TODO: change get request to POST request using APIRequest
  // TODO: add token to the request
  getArticle(id: number): Promise<Article> {
      let apiRequest = <APIRequest>({
          apiKey: '',
          operator: '',
          token: '',
          body: {'id':id}
      });
      const url = Config.api_host + '/article';
      console.log(JSON.stringify(apiRequest));

      return this.http.post(url, JSON.stringify(apiRequest), {headers: this.headers})
      .toPromise()
      .then(response => {
          if(response.json().code == '200') {
            let article = response.json().body as Article;
            this.emitStatusChangeEvent(article, this.message);
            return article;
          } else {
            this.message = Text.val(500);
            this.emitStatusChangeEvent(null, this.message);
          }
        })
        .catch((ex) => this.handleError(ex));
  }

  private handleError(error: any) {
    this.emitStatusChangeEvent(null, Text.val(500));
    //return Promise.reject(error.message || error);
  }

  emitStatusChangeEvent(article: Article, message: string) {
    this.statusChange.emit({article:article, message:message});
  }

  getStatusChangeEmitter() {
    return this.statusChange;
  }

}

