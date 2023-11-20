import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AppRoutingModule} from "./app-routing.module";
import {PortalModule} from "@angular/cdk/portal";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AuthenticationComponent,
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
    MatInputModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PortalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
