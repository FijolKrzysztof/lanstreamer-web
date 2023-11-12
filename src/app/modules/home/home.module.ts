import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeTabsComponent} from './components/home-tabs/home-tabs.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HomeFooterComponent} from './components/home-footer/home-footer.component';
import {HomeInputDialogComponent} from './components/home-input-dialog/home-input-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TextFieldModule} from "@angular/cdk/text-field";
import {HomeDownloadsComponent} from './components/home-downloads/home-downloads.component';
import {HomeGalleryComponent} from './components/home-gallery/home-gallery.component';
import { HomeAboutComponent } from './components/home-about/home-about.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeTabsComponent,
    HomeFooterComponent,
    HomeInputDialogComponent,
    HomeDownloadsComponent,
    HomeGalleryComponent,
    HomeAboutComponent,
    HomeHeaderComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
