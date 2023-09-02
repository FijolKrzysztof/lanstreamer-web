import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import { OnLeaveModalComponent } from './components/home-page/modals/on-leave-modal/on-leave-modal.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";

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
    OnLeaveModalComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
