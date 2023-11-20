import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationDialogComponent } from './authentication-dialog/authentication-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
    declarations: [
        AuthenticationComponent,
        AuthenticationDialogComponent
    ],
    exports: [
        AuthenticationComponent
    ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatDialogModule
  ]
})
export class AuthenticationModule { }
