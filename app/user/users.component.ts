import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config, Text } from '../common/config';
import { APIResponse } from '../common/api-response';
import { Event } from '../common/event';

import { User } from './user';
import { UserDetailComponent } from './user-detail.component';

import { UserService } from './user.service';

@Component({
    moduleId: module.id,
    selector: 'my-users',
    templateUrl: 'users.component.html',
    styleUrls: [ 'users.component.css' ]
})

export class UsersComponent implements OnInit {

  objects: User[];
  selectedObject: User;
  message: string;
  subscription: any;

  apiResponse: APIResponse;
  page: number;
  size: number = Config.PAGE_NUM;

  constructor(
    private router: Router,
    private service: UserService
  ) {
    this.message = this.service.message;
    this.subscription = this.service.getStatusChangeEmitter()
    .subscribe(($event:any) => {
    if($event.object instanceof Event && $event.object.type == Event.RELOAD) {
      this.ngOnInit();
    }
        this.message = $event.message;
    } );
  }

  getObjects(page: number, size: number): void {
    this.service.getObjects(page, size).then(
      apiResponse => {
        this.apiResponse = apiResponse;
        this.objects = apiResponse.body as User[];
      }
    );
  }

  ngOnInit(): void {
    this.getObjects(0, Config.PAGE_NUM);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelect(object: User): void {
    this.selectedObject = object;
  }

  gotoDetail(): void {
    this.router.navigate(['/user-detail', this.selectedObject.id]);
  }

  gotoEdit(): void {
    this.router.navigate(['/user-edit', this.selectedObject.id]);
  }

  view(object: User): void {
    this.onSelect(object);
    this.router.navigate(['/user-detail', this.selectedObject.id]);
  }

  edit(object: User): void {
    this.onSelect(object);
    this.router.navigate(['/user-edit', this.selectedObject.id]);
  }

  add(): void {
    this.router.navigate(['/user-edit', -1]);
  }

  delete(object: User): void {
    if(confirm('are you sure?')) {
      this.onSelect(object);
      this.service.delete(this.selectedObject);
    }
  }
  
  selectObjects(event: any) {
    //alert("page change");
    //this.page = this.paginationComponent.page; // pass parameter from service (triggered by pageChange Event)
    //this.size = this.paginationComponent.size;
    this.getObjects(event.page, event.size);
  }
}
