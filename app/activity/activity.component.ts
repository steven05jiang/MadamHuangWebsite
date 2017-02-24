import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { Activity } from './activity';
import { ActivityService } from './activity.service';
import { APIResponse } from '../common/api-response';

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
	defaultImage = 'image/loading.png';

	apiResponse: APIResponse;
	page: number;
	size: number;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service: ActivityService
		) {
		this.size = 9;
		this.page = 0;
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
		this.getActivities(this.page);
	}

	getActivities(page: number){
		this.service.getActivities(page, this.size).then(
		apiResponse => {
				this.apiResponse = apiResponse;
				this.objects = apiResponse.body as Activity[];
			}
		);
	}

	openArticle(activity: Activity): void{
		console.log('Ready to nav to article '+activity.articleId);
		this.router.navigate(['/article', activity.articleId]);
	}

}
