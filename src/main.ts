import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {provideRouter} from "@angular/router";
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {routes} from "./app/app-routes";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
  ]
})
  .catch(err => console.error(err));
