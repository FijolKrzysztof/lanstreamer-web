import {ChangeDetectionStrategy, Component, HostBinding, HostListener} from '@angular/core';
import {HomeDataService} from "./services/home-data.service";
import {catchError, take} from "rxjs";
import {ClientService} from "../../services/client.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  // TODO: dodanie przycisku logowania w footerze prawdopodobnie i jak się zaloguje i będzie admin to przeniesienie do panelu admina
  //  lub panelu użytkownika kótry teraz będzie tylko panelem admina

  private initializeClient(): void {
    this.clientService.create({id: -1, feedbacks: [], referrerWebsite: document.referrer ?? null})
      .pipe(
        catchError(err => this.notificationService.handleAndShowError(err, 'Something went wrong!')),
        take(1),
      )
      .subscribe(this.homeDataService.client);
  }
}
