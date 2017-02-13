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
		this.message = this.service.message;
		this.subscription = this.service.getStatusChangeEmitter()
		.subscribe(($event:any) => {
			if($event.object instanceof Event && $event.object.type == Event.RELOAD) {
				this.ngOnInit();
			}
			this.message = $event.message;
		} );
	}
	ngOnInit(): void {
		this.activatedRoute.params.forEach((params: Params) => {
	        this.id = +params['id'];
	    })
		this.service.getObject(this.id).then(
			apiResponse => {
				this.apiResponse = apiResponse;
				this.article = apiResponse.body as Article;
				console.log(this.article);
			}
		);
	}

}
