import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { APIResponse } from '../common/api-response';

import { Activity } from './activity';
import { ActivityService } from './activity.service';
 

@Component({
	moduleId: module.id,
	selector: 'my-activity',
	templateUrl: 'activity.component.html',
	styleUrls: [ 'activity.component.css' ]
})

export class ActivityComponent implements OnInit {
	objects: Activity[];
	selectedObject: Activity;
	message: string;
	subscription: any;

	apiResponse: APIResponse;
	page: number;
	size: number;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service: ActivityService,
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
		this.page = 0;
		this.size = 1000;
		this.service.getObjects(this.page, this.size).then(
			apiResponse => {
				this.apiResponse = apiResponse;
				this.objects = apiResponse.body as Activity[];
			}
		);
	}

	openArticle(activity: Activity): void{
		console.log('Ready to nav to article '+activity.article.id);
		this.router.navigate(['/article', activity.article.id]);
	}

}
