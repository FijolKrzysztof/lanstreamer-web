import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import { NotificationPopupContentComponent } from './notification-popup-content/notification-popup-content.component';
import { TescikComponent } from './tescik/tescik.component';


@NgModule({
  declarations: [

    NotificationPopupContentComponent,
       TescikComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    TescikComponent,
    NotificationPopupContentComponent,
  ]
})
export class NotificationPopupModule {
}
