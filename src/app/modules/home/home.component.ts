import {ChangeDetectionStrategy, Component, HostBinding, HostListener} from '@angular/core';
import {HomeDataService} from "./services/home-data.service";
import {catchError, take} from "rxjs";
import {ClientService} from "../../services/client.service";
import {NotificationService} from "../../services/notification.service";
import {HomeHeaderComponent} from "./components/home-header/home-header.component";
import {HomeDownloadsComponent} from "./components/home-downloads/home-downloads.component";
import {HomeGalleryComponent} from "./components/home-gallery/home-gallery.component";
import {HomeAboutComponent} from "./components/home-about/home-about.component";
import {HomeTabsComponent} from "./components/home-tabs/home-tabs.component";
import {HomeFooterComponent} from "./components/home-footer/home-footer.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ClientDto} from "../../data/dto/client-dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    HomeHeaderComponent,
    HomeDownloadsComponent,
    HomeGalleryComponent,
    HomeAboutComponent,
    HomeTabsComponent,
    HomeFooterComponent,
    MatDialogModule,
  ],
  providers: [HomeDataService]
})
export class HomeComponent {

  constructor(
    private readonly clientService: ClientService,
    private readonly homeDataService: HomeDataService,
    private readonly notificationService: NotificationService,
  ) {
    this.initializeClient();
  }

  @HostBinding('class')
  private readonly hostClass = 'home-component';

  @HostListener('window:beforeunload')
  updateSessionDuration() {
    const clientId = this.homeDataService.client.value.id;
    this.clientService.updateSessionDuration(clientId);
  }

  private initializeClient(): void {
    this.clientService.create({referrerWebsite: document.referrer ?? null} as ClientDto)
      .pipe(
        catchError(err => this.notificationService.handleAndShowError(err, 'Something went wrong!')),
        take(1),
      )
      .subscribe(createdObjResponse => {
        this.homeDataService.client.next({id: createdObjResponse.id});
      });
  }
}
