import { Component, OnInit } from '@angular/core';

import { User } from '../user/user';

import { LoginService }          from '../login/login.service';

// Menu Component
@Component({
  moduleId: module.id,
  selector: "my-menu",
  templateUrl: 'menu.component.html',
  styleUrls: [ 'menu.component.css' ]
})

export class MenuComponent implements OnInit {

  user: User;
  subscription: any;  // subscribed to login event

  constructor(private loginService:LoginService) {

    this.user = this.loginService.user;
    this.subscription = this.loginService.getStatusChangeEmitter()
      .subscribe(($event:any) => {
        if($event.user) {
          this.user = $event.user;
          }
          // TODO: message is not used for now.
          //this.message = $event.message;
    } );
  }

  ngOnInit(): void {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signin(): void {
    alert('sign in');
  }

  signout(event: any): void {
    //alert('sign out');
    this.loginService.signout();
  }

  search(event: any): void {
    alert('not implement');
  }
}
