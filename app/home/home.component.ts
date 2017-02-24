import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject, AfterViewInit} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Message } from '../contact/contact';
import { ContactService }          from '../contact/contact.service';
import { Http } from '@angular/http';
//declare var jQuery:JQueryStatic;

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
  animationHelper: any;
  timer: any;

  @ViewChild('badge1') badge1: ElementRef;
  @ViewChild('about') about: ElementRef;

  constructor(
    private contactService: ContactService,
    private http: Http,
    @Inject(DOCUMENT) private document: Document
    //private window: Window
    ) {
    this.animationHelper = {};
    this.animationHelper.badge1 = false;
    this.animationHelper.badge2 = false;
    this.animationHelper.badge3 = false;
    this.animationHelper.badge4 = false;
    this.animationHelper.beauty = false;
    this.animationHelper.about = false;
    this.animationHelper.isBadgeAnimate = false;
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
    //setTimeout(() => {this.addBeautyAnimation()}, 500);
	}

	ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addBeautyAnimation(){
    this.animationHelper.beauty = true;
  }

  //@HostListener('window:scroll', []) 
  listenScrollAnimation(){


    let height = window.innerHeight;
    if(!this.animationHelper.isBadgeAnimate&&this.badge1.nativeElement.getBoundingClientRect().top < height){
      this.animationHelper.isBadgeAnimate = true;
      this.animationHelper.badge1 = true;
      this.timer = setInterval(() => {
        this.addBadgeAnimation();
      }, 1000);
    }
    if(this.about.nativeElement.getBoundingClientRect().top < height){
      this.animationHelper.about = true;
    }
  }

  addBadgeAnimation(){
    if(!this.animationHelper.badge2){
      this.animationHelper.badge2 = true;
    }else if(!this.animationHelper.badge3){
      this.animationHelper.badge3 = true;
    }else if(!this.animationHelper.badge4){
      this.animationHelper.badge4 = true;
      clearInterval(this.timer);
    } 
  }



    clearMessage() {
    this.message = '';
  }

	  onSubmit() {
  	this.contactService.sendMessage(this.msg);
  }

}
