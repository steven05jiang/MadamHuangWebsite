import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute }   from '@angular/router';

import { Article } from '../article/article';
import { Activity } from '../activity/activity';
import { User }           from '../user/user';
import { ClassroomItem }           from '../classroom/classroom-item';
import { Message }           from '../contact/contact';
import { Product }           from '../product/product';

import { ArticleService }    from '../article/article.service';
import { ProductService }    from '../product/product.service';
import { ActivityService }    from '../activity/activity.service';
import { LoginService }    from '../login/login.service';
import { AdminService }    from './admin.service';
import { ClassroomService }           from '../classroom/classroom.service';




@Component({
    moduleId: module.id,
    selector: 'my-admin',
    templateUrl: 'admin.component.html',
    styleUrls: [ 'admin.component.css' ]
})

export class AdminComponent implements OnInit {
	articles: Article[];
	articleNew: Article;
	contacts: Message[];
	activities: Activity[];
	activityNew: Activity;
	products: Product[];
	productNew: Product;
	classroomItems: ClassroomItem[];
	classroomItemNew: ClassroomItem;

	adminHelper: any;
	user: User;

	message: string;
  	subscription: any;

  constructor(
  	private adminService: AdminService,
  	private loginService: LoginService,
  	private articleService: ArticleService,
  	private activityService: ActivityService,
  	private classroomService: ClassroomService,
  	private productService: ProductService,
  	private http: Http,
  	private router: Router,
    private activatedRoute: ActivatedRoute
  	) {
  	this.adminHelper = {};
  	this.adminHelper.articleEditMode = false;
  	this.adminHelper.articleAddMode = false;
  	this.adminHelper.articleMessage = '';
  	this.adminHelper.articleSize = 10;
  	this.adminHelper.articlePage = 0;
  	this.adminHelper.articleTotalPage = 1;

  	this.adminHelper.activityEditMode = false;
  	this.adminHelper.activityAddMode = false;
  	this.adminHelper.activityMessage = '';
  	this.adminHelper.activitySize = 10;
  	this.adminHelper.activityPage = 0;
  	this.adminHelper.activityTotalPage = 1;

  	this.adminHelper.classroomItemEditMode = false;
  	this.adminHelper.classroomItemAddMode = false;
  	this.adminHelper.classroomItemMessage = '';
  	this.adminHelper.classroomItemSize = 10;
  	this.adminHelper.classroomItemPage = 0;
  	this.adminHelper.classroomItemTotalPage = 1;

  	this.adminHelper.productEditMode = false;
  	this.adminHelper.productAddMode = false;
  	this.adminHelper.productMessage = '';
  	this.adminHelper.productSize = 10;
  	this.adminHelper.productPage = 0;
  	this.adminHelper.productTotalPage = 1;

  	this.adminHelper.contactSize = 10;
  	this.adminHelper.contactPage = 0;
  	this.adminHelper.contactTotalPage = 1;
  	this.adminHelper.contactMessage = '';

	this.subscription = this.loginService.getStatusChangeEmitter()
    .subscribe(($event:any) => {
    	if(!$event.user){
    		this.user == null;
    		this.router.navigate(['login']);
    	}else if(!$event.user.isAdmin) {
	        this.user = $event.user;
	        this.router.navigate(['']);
      }
      this.message = $event.message;

    } );
  }

  	ngOnInit(): void {
  		this.getArticles(this.adminHelper.articlePage);
  		this.getContacts(this.adminHelper.contactPage);
  		//this.getActivities(this.adminHelper.activityPage);
  		this.getProducts(this.adminHelper.productPage);
  		this.getClassroomItems(this.adminHelper.classroomItemPage);
	}

	ngOnDestroy() {
    this.subscription.unsubscribe();
  }


	getArticles(page: number){
		if(page < 0 || (this.adminHelper.articleTotalPage != null && page >= this.adminHelper.articleTotalPage)){
			alert('No more articles.');
			return;
		}
		this.articleService.getArticles(page, this.adminHelper.articleSize).then(
  			response => {
  				//console.log(response);
  				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.articlePage = page;
					this.adminHelper.articleTotalPage = response.totalPages;
					this.articles = response.body as Article[];
				}else{
					this.adminHelper.articleMessage = response.message;
				}

  		});
	}

	editArticle(){
		this.adminHelper.articleEditMode = true;
	}

	updateArticle(article: Article){
		if(article.createdDate != null){
			article.createdDate = new Date(article.createdDate);
		}
		if(article.updatedDate != null){
			article.updatedDate = new Date(article.updatedDate);
		}
		this.adminService.updateArticle(article).then(
			response => {
				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.articleEditMode = false;
					this.adminHelper.articleMessage = 'Seccessfully Update.';
					let index = this.articles.indexOf(article);
					if (index !== -1) {
					    this.articles[index] = response.body as Article;
					}
				}else{
					this.adminHelper.articleMessage = response.message;
				}
			});
	}

	addArticle(article: Article){
	this.adminService.addArticle(article).then(
		response => {
			if(response.token == null) {
				this.loginService.signout();
				return;
			}
			if(response.code == '200'){
				this.adminHelper.articleAddMode = false;
				this.articleNew = null;
				this.adminHelper.articleMessage = 'Seccessfully Update.';
				let object = response.body as Article;
				this.articles.unshift(object);
				
			}else{
				this.adminHelper.articleMessage = response.message;
			}
		});
	}

	deleteArticle(article: Article) {
		if(confirm('確認刪除')) {
		this.adminService.deleteArticle(article.id).then(
		response => {
			if(response.token == null) {
				this.loginService.signout();
				return;
			}
			if(response.code == '200'){
				let index = this.articles.indexOf(article);
				this.articles.splice(index, 1);
			}else{
				this.adminHelper.articleMessage = response.message;
			}
		});
	    }



	}

	exitEditArticle(){
		this.adminHelper.articleEditMode = false;
	}

	newArticle(){
		this.articleNew = new Article();
		this.adminHelper.articleAddMode = !this.adminHelper.articleAddMode;
	}

	resetNewArticle(){
		this.articleNew = new Article();
	}

	getContacts(page: number){
		if(page < 0 || (this.adminHelper.contactTotalPage != null && page >= this.adminHelper.contactTotalPage)){
			alert('No more messages.');
			return;
		}
		this.adminService.getContacts(page, this.adminHelper.contactSize).then(
  			response => {
  				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.contactPage = page;
					this.adminHelper.contactTotalPage = response.totalPages;
					this.contacts = response.body as Message[];
				}else{
					this.adminHelper.contactMessage = response.message;
				}

  		});
	}
/*
	getActivities(page: number){
		if(page < 0 || (this.adminHelper.activityTotalPage != null && page >= this.adminHelper.activityTotalPage)){
			alert('No more articles.');
			return;
		}
		this.activityService.getActivities(page, this.adminHelper.activitySize).then(
  			response => {
  				//console.log(response);
  				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.activityPage = page;
					this.adminHelper.activityTotalPage = response.totalPages;
					this.activities = response.body as Activity[];
				}else{
					this.adminHelper.activityMessage = response.message;
				}

  		});
	}
*/
	editActivity(){
		this.adminHelper.activityEditMode = true;
	}

	updateActivity(activity: Activity){
		if(activity.createdDate != null){
			activity.createdDate = new Date(activity.createdDate);
		}
		if(activity.startDate != null){
			activity.startDate = new Date(activity.startDate);
		}
		if(activity.endDate != null){
			activity.endDate = new Date(activity.endDate);
		}
		
		this.adminService.updateActivity(activity).then(
			response => {
				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.activityEditMode = false;
					this.adminHelper.activityMessage = 'Seccessfully Update.';
					let index = this.activities.indexOf(activity);
					if (index !== -1) {
					    this.activities[index] = response.body as Activity;
					}
				}else{
					this.adminHelper.activityMessage = response.message;
				}
			});
	}

	addActivity(activity: Activity){
	this.adminService.addActivity(activity).then(
		response => {
			if(response.token == null) {
				this.loginService.signout();
				return;
			}
			if(response.code == '200'){
				this.adminHelper.activityAddMode = false;
				this.activityNew = null;
				this.adminHelper.activityMessage = 'Seccessfully Update.';
				let object = response.body as Activity;
				this.activities.unshift(object);
				
			}else{
				this.adminHelper.activityMessage = response.message;
			}
		});
	}

	deleteActivity(activity: Activity) {
		if(confirm('確認刪除')) {
		this.adminService.deleteActivity(activity.id).then(
		response => {
			if(response.token == null) {
				this.loginService.signout();
				return;
			}
			if(response.code == '200'){
				let index = this.activities.indexOf(activity);
				this.activities.splice(index, 1);
			}else{
				this.adminHelper.activityMessage = response.message;
			}
		});
	    }



	}

	exitEditActivity(){
		this.adminHelper.activityEditMode = false;
	}

	newActivity(){
		this.activityNew = new Activity();
		this.adminHelper.activityAddMode = !this.adminHelper.activityAddMode;
	}

	resetNewActivity(){
		this.activityNew = new Activity();
	}

	getClassroomItems(page: number){
		if(page < 0 || (this.adminHelper.classroomItemTotalPage != null && page >= this.adminHelper.classroomItemTotalPage)){
			alert('No more classroom items.');
			return;
		}
		this.classroomService.getObjects(page, this.adminHelper.classroomItemSize).then(
  			response => {
  				//console.log(response);
  				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.classroomItemPage = page;
					this.adminHelper.classroomItemTotalPage = response.totalPages;
					this.classroomItems = response.body as ClassroomItem[];
				}else{
					this.adminHelper.classroomItemMessage = response.message;
				}

  		});
	}

	editClassroomItem(){
		this.adminHelper.classroomItemEditMode = true;
	}

	updateClassroomItem(classroomItem: ClassroomItem){
		if(classroomItem.updatedDate != null){
			classroomItem.updatedDate = new Date(classroomItem.updatedDate);
		}
		
		this.adminService.updateClassroomItem(classroomItem).then(
			response => {
				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.classroomItemEditMode = false;
					this.adminHelper.classroomItemMessage = 'Seccessfully Update.';
					let index = this.classroomItems.indexOf(classroomItem);
					if (index !== -1) {
					    this.classroomItems[index] = response.body as ClassroomItem;
					}
				}else{
					this.adminHelper.classroomItemMessage = response.message;
				}
			});
	}

	addClassroomItem(classroomItem: ClassroomItem){
	this.adminService.addClassroomItem(classroomItem).then(
		response => {
			if(response.token == null) {
				this.loginService.signout();
				return;
			}
			if(response.code == '200'){
				this.adminHelper.classroomItemAddMode = false;
				this.classroomItemNew = null;
				this.adminHelper.classroomItemMessage = 'Seccessfully Update.';
				let object = response.body as ClassroomItem;
				this.classroomItems.unshift(object);
				
			}else{
				this.adminHelper.classroomItemMessage = response.message;
			}
		});
	}

	deleteClassroomItem(classroomItem: ClassroomItem) {
		if(confirm('確認刪除')) {
		this.adminService.deleteClassroomItem(classroomItem.id).then(
		response => {
			if(response.token == null) {
				this.loginService.signout();
				return;
			}
			if(response.code == '200'){
				let index = this.classroomItems.indexOf(classroomItem);
				this.classroomItems.splice(index, 1);
			}else{
				this.adminHelper.classroomItemMessage = response.message;
			}
		});
	    }



	}

	exitEditClassroomItem(){
		this.adminHelper.classroomItemEditMode = false;
	}

	newClassroomItem(){
		this.classroomItemNew = new ClassroomItem();
		this.adminHelper.classroomItemAddMode = !this.adminHelper.classroomItemAddMode;
	}

	resetNewClassroomItem(){
		this.classroomItemNew = new ClassroomItem();
	}

	getProducts(page: number){
		if(page < 0 || (this.adminHelper.productTotalPage != null && page >= this.adminHelper.productTotalPage)){
			alert('No more products.');
			return;
		}
		this.productService.getObjects(page, this.adminHelper.activitySize).then(
  			response => {
  				//console.log(response);
  				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.productPage = page;
					this.adminHelper.productTotalPage = response.totalPages;
					this.products = response.body as Product[];
				}else{
					this.adminHelper.productMessage = response.message;
				}

  		});
	}

	editProduct(){
		this.adminHelper.productEditMode = true;
	}

	updateProduct(product: Product){
		this.adminService.updateProduct(product).then(
			response => {
				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.productEditMode = false;
					this.adminHelper.productMessage = 'Seccessfully Update.';
					let index = this.products.indexOf(product);
					if (index !== -1) {
					    this.products[index] = response.body as Product;
					}
				}else{
					this.adminHelper.productMessage = response.message;
				}
			});
	}

	addProduct(product: Product){
	this.adminService.addProduct(product).then(
		response => {
			if(response.token == null) {
				this.loginService.signout();
				return;
			}
			if(response.code == '200'){
				this.adminHelper.productAddMode = false;
				this.productNew = null;
				this.adminHelper.productMessage = 'Seccessfully Update.';
				let object = response.body as Product;
				this.products.unshift(object);
				
			}else{
				this.adminHelper.activityMessage = response.message;
			}
		});
	}

	deleteProduct(product: Product) {
		if(confirm('確認刪除')) {
		this.adminService.deleteProduct(product.id).then(
		response => {
			if(response.token == null) {
				this.loginService.signout();
				return;
			}
			if(response.code == '200'){
				let index = this.products.indexOf(product);
				this.products.splice(index, 1);
			}else{
				this.adminHelper.productMessage = response.message;
			}
		});
	    }



	}

	exitEditProduct(){
		this.adminHelper.productEditMode = false;
	}

	newProduct(){
		this.productNew = new Product();
		this.adminHelper.productAddMode = !this.adminHelper.productAddMode;
	}

	resetNewProduct(){
		this.productNew = new Product();
	}
}
