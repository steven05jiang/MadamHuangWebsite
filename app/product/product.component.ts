import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Config } from '../common/config';
import { Event } from '../common/event';

import { APIResponse } from '../common/api-response';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
    moduleId: module.id,
    selector: 'my-product',
    templateUrl: 'product.component.html',
    styleUrls: [ 'product.component.css' ]
})

export class ProductComponent implements OnInit {
	objects: Product[];
	selectedObject: Product;
	message: string;
	subscription: any;
	defaultImage = 'image/loading.png';

	apiResponse: APIResponse;
	page: number;
	size: number;


	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service: ProductService,
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

  ngOnInit(): void {
  		this.page = 0;
		this.size = 1000;
		this.service.getObjects(this.page, this.size).then(
			apiResponse => {
				this.apiResponse = apiResponse;
				this.objects = apiResponse.body as Product[];
			}
		);
  }

  	openArticle(product: Product): void{
		console.log('Ready to nav to article '+product.article.id);
		this.router.navigate(['/article', product.article.id]);
	}

}
