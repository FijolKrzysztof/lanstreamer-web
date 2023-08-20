import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'ref?=', pathMatch: 'prefix', component: HomePageComponent},
  {path: 'authentication/:id', component: AuthenticationComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AuthenticationComponent,
    HomePageComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatButtonModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        MatTabsModule,
        MatIconModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
