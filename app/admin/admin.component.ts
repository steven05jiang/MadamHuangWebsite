import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute }   from '@angular/router';

import { Article } from '../article/article';
import { User }           from '../user/user';
import { Message }           from '../contact/contact';

import { ArticleService }    from '../article/article.service';
import { LoginService }    from '../login/login.service';
import { AdminService }    from './admin.service';




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
	adminHelper: any;
	user: User;

	message: string;
  	subscription: any;

  constructor(
  	private adminService: AdminService,
  	private loginService: LoginService,
  	private articleService: ArticleService,
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
	        this.router.navigate(['home']);
      }
      this.message = $event.message;

    } );
  }

  	ngOnInit(): void {
  		this.getArticles(this.adminHelper.articlePage);
  		this.getContacts(this.adminHelper.contactPage);
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
	preArticlePage(){
		this.getArticles(this.adminHelper.articlePage-1);
	}

	nextArticlePage(){
		this.getArticles(this.adminHelper.articlePage+1);
	}

	editArticle(){
		this.adminHelper.articleEditMode = true;
	}

	updateArticle(article: Article){
		this.adminService.updateArticle(article).then(
			response => {
				if(response.token == null) {
					this.loginService.signout();
					return;
				}
				if(response.code == '200'){
					this.adminHelper.articleEditMode = false;
					this.adminHelper.articleMessage = 'Seccessfully Update.';
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

	exitEdit(){
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
	preContactPage(){
		this.getContacts(this.adminHelper.contactPage-1);
	}

	nextContactPage(){
		this.getContacts(this.adminHelper.contactPage+1);
	}
}
