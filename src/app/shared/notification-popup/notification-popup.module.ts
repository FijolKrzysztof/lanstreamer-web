import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {ErrorPopupComponent} from './components/error-popup/error-popup.component';


@NgModule({
  declarations: [
    ErrorPopupComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
})
export class NotificationPopupModule {
}
