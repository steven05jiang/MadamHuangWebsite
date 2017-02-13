export class Article {
	id: number;
	title: string;
	content: string;
	createdDate: string;

	constructor(){
		this.id = -1;
		this.createdDate = (new Date().getTime()).toString();
	}
}