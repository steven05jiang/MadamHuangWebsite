import { Component, OnInit, EventEmitter} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Event } from '../common/event';
import { Config} from '../common/config';
import 'rxjs/add/operator/toPromise';

@Component({
	moduleId: module.id,
	selector: 'my-testAPI',
	templateUrl: 'testAPI.component.html'
})

export class TestAPIComponent implements OnInit {

	object: any;
	message: string;
	statusChange: EventEmitter<({object:any, message:string})> = new EventEmitter();

	constructor(private http: Http) {}

	ngOnInit(): void {
	}

	testCall(): void{
		this.getObject()
		.then(object => this.object = object)
		.catch((ex) => this.handleError(ex));
	}

  getObject(): Promise<any> {
      const url = Config.api_host + '/users';

      return this.http.get(url)
      .toPromise()
      .then(response => {
          return response.text();
        })
        .catch((ex) => this.handleError(ex));
  }

  private handleError(error: any) {
    this.emitStatusChangeEvent(null, 'Error');
    //return Promise.reject(error.message || error);
  }

  emitStatusChangeEvent(object: any, message: string) {
    this.statusChange.emit({object:object, message:message});
  }

  getStatusChangeEmitter() {
    return this.statusChange;
  }

}
