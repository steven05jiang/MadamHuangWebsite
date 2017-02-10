import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <my-menu></my-menu>
    <router-outlet></router-outlet>
    `
})

export class AppComponent {
}
