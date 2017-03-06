import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-about',
    templateUrl: 'about.component.html',
    styleUrls: [ 'about.component.css' ]
})

export class AboutComponent implements OnInit {

  constructor(
	private route: ActivatedRoute
	) {
  }

  ngOnInit(): void {
  	this.route.fragment.subscribe(f => {
      const element = document.querySelector("#" + f);
      if (element) element.scrollIntoView(element);
    })
	}
}
