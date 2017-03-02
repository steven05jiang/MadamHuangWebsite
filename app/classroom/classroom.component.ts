import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { ClassroomItem }    from './classroom-item';

import { APIResponse } from '../common/api-response';
import { ClassroomService }    from './classroom.service';

@Component({
	moduleId: module.id,
	selector: 'my-classroom',
	templateUrl: 'classroom.component.html',
	styleUrls: [ 'classroom.component.css' ]
})

export class ClassroomComponent implements OnInit {

	//classroom: Classroom;
	//classroomType: ClassroomType;


	items: ClassroomItem[];
	size = 9;
	totalPage :number;
	curPage: number;

	message: string;
	subscription: any;

	defaultImage = 'image/loading.png';
	constructor(
		private classroomService: ClassroomService,
		private router: Router,
    	private activatedRoute: ActivatedRoute
		){
		//this.classroom = new Classroom('', '美麗課堂','','');
		this.curPage = 0;
		this.message = this.classroomService.message;
		this.subscription = this.classroomService.getStatusChangeEmitter()
		.subscribe(($event:any) => {
			if($event.object instanceof Event && $event.object.type == Event.RELOAD) {
				//this.ngOnInit();
			}
			this.message = $event.message;
		} );
	}


	ngOnInit(): void {
		// getting parameter from route
		/*
		this.classroomType = new ClassroomType();
    	this.activatedRoute.params.forEach((params: Params) => {
    	this.classroom = this.classroomType.map[params['name']];
    	*/
    //})
    	this.getArticles(this.curPage);
	}

	getArticles(page:number){
		this.classroomService.getObjects(page, this.size).then(
			apiResponse => {
				this.totalPage = apiResponse.totalPages;
				this.items = apiResponse.body as ClassroomItem[];
			}
		);
	}

	openArticle(classroomItem: ClassroomItem): void{
		//console.log('Ready to nav to article '+classroomItem.articleId);
		this.router.navigate(['/article', classroomItem.articleId]);
	}

	ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
