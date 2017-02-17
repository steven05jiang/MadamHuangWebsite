import { Component, OnInit} from '@angular/core';
import { Message } from '../contact/contact';
import { ContactService }          from '../contact/contact.service';
import { Http } from '@angular/http';

@Component({
	moduleId: module.id,
	selector: 'my-home',
	templateUrl: 'home.component.html',
	styleUrls: [ 'home.component.css' ]
})

export class HomeComponent implements OnInit {

	msg: Message;
	subscription: any;
	message: string;


  constructor(private contactService: ContactService,private http: Http) {
  	this.msg = new Message();
  	this.subscription = this.contactService.getStatusChangeEmitter()
        .subscribe(($event:any) => {
       	if($event.object != null){
            this.msg = new Message();
          }
          this.message = $event.message;
        });
  }

	ngOnInit(): void {
	}

	ngOnDestroy() {
    this.subscription.unsubscribe();
  }

    clearMessage() {
    this.message = '';
  }

	  onSubmit() {
  	this.contactService.sendMessage(this.msg);
  }

}
