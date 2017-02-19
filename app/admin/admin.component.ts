import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute }   from '@angular/router';

import { Article } from '../article/article';
import { User }           from '../user/user';

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
  		this.articleService.getArticles().then(
  			response => {
  				this.articles = response.body as Article[];
  		});
	}

	ngOnDestroy() {
    this.subscription.unsubscribe();
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
}
