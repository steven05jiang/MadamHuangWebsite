import { Classroom } from './classroom';
import { Injectable } from '@angular/core';

@Injectable()
export class ClassroomType {
	map: { [name: string]: Classroom; } = {};

	constructor () {
		this.map['taste'] = new Classroom('taste', '審美課堂','','');
		this.map['insight'] = new Classroom('insight', '心美課堂','','');
		this.map['figure'] = new Classroom('figure', '體美課堂','','');
		this.map['skin'] = new Classroom('skin', '膚美課堂','','');
	}

}
