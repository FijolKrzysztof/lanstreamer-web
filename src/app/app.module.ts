import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AppRoutingModule} from "./app-routing.module";
import {PortalModule} from "@angular/cdk/portal";
import {NotificationPopupModule} from "./modules/shared/notification-popup/notification-popup.module";

@NgModule({
  declarations: [
    AppComponent,
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
    NotificationPopupModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
