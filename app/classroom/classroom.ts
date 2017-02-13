export class Classroom {
	name:	string;
	title: string;
	description: string;
	apiRequest:	string;

	constructor(name: string, title: string, description: string, apiRequest: string){
		this.name = name;
		this.title = title;
		this.description = description;
		this.apiRequest = apiRequest;
	}
}