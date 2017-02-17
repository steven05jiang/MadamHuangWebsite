export class User {
	id:	number;
	email:	string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	tel: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	state:	string;
	country: string;
	zipCode: string;
	isAdmin: boolean;

	constructor(){
		this.id = -1;
	}
}