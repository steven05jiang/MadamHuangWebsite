import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { APIResponse } from '../common/api-response';
import { Classroom } from './classroom';
import { ClassroomType } from './classroomType';

@Component({
	moduleId: module.id,
	selector: 'my-classroom',
	templateUrl: 'classroom.component.html',
	styleUrls: [ 'classroom.component.css' ]
})

export class ClassroomComponent implements OnInit {

	classroom: Classroom;
	classroomType: ClassroomType;

	constructor(
		private router: Router,
    	private activatedRoute: ActivatedRoute
		){}


	ngOnInit(): void {
		    // getting parameter from route
		this.classroomType = new ClassroomType();
    	this.activatedRoute.params.forEach((params: Params) => {
    	this.classroom = this.classroomType.map[params['name']];
    })
	}

}
