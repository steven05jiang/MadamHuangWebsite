import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { APIResponse } from '../common/api-response';

import { Article } from './article';
import { ArticleService } from './article.service';

@Component({
	moduleId: module.id,
	selector: 'my-article',
	templateUrl: 'article.component.html',
	styleUrls: [ 'article.component.css' ]
})

export class ArticleComponent implements OnInit {
	article: Article;
	id: number;
	message: string;
	subscription: any;

	apiResponse: APIResponse;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service: ArticleService,
		) {
		this.article = new Article();
		this.message = this.service.message;
		this.subscription = this.service.getStatusChangeEmitter()
		.subscribe(($event:any) => {
			if($event.article) {
				this.article = $event.article;
			}
			this.message = $event.message;
		} );
	}
	ngOnInit(): void {
		this.activatedRoute.params.forEach((params: Params) => {
	        this.id = +params['id'];
	    })
		this.getArticle();
	}

	getArticle(): void {
		this.service.getArticle(this.id).then(
		article => {
			this.article = article;
			console.log(this.article);
		});
	}

	  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
