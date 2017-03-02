import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { AppModule } from './app.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule)
  .then(success => console.log('Welcome to Madamhuang Club'))
  .catch(error => console.log(error));
