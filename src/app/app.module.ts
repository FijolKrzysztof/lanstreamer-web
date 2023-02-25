import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';

const routes: Routes = [
  {path: 'authentication/:id', component: AuthenticationComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('34057223675-m245q453mcmhga710vc85asdfi9j74mg.apps.googleusercontent.com')
        }
      ]
    }
  },
    SocialAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
