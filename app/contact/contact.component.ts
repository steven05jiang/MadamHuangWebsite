import { Component, OnInit } from '@angular/core';
import { Message } from './contact';
import { ContactService }          from './contact.service';
import { Http } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'my-contact',
    templateUrl: 'contact.component.html',
    styleUrls: [ 'contact.component.css' ]
})

export class ContactComponent implements OnInit{

	msg: Message;
	subscription: any;
	message: string;
  messageHelper: any;



  constructor(private contactService: ContactService,private http: Http) {
  	this.messageHelper = {};
    this.messageHelper.isWaiting = false;
    this.msg = new Message();
  	this.subscription = this.contactService.getStatusChangeEmitter()
        .subscribe(($event:any) => {
          if($event.object != null){
            this.msg = new Message();
          }
          this.messageHelper.isWaiting = false;
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
    this.messageHelper.isWaiting = true;
    if(!this.messageHelper.requiredMessage){
      this.contactService.sendMessage(this.msg);
    }else{
      this.messageHelper.isWaiting = false;
      this.msg = new Message();
    }
  }
}
