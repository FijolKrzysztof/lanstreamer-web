import {ChangeDetectionStrategy, Component, HostBinding, HostListener} from '@angular/core';
import {HomeDataService} from "./services/home-data.service";
import {switchMap, take} from "rxjs";
import {ClientService} from "../../services/client.service";

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
  ) {
    this.initializeClient();
  }

  @HostBinding('class')
  private readonly hostClass = 'home-page-component';

  @HostListener('window:beforeunload')
  updateSessionDuration() {
    this.homeDataService.client
      .pipe(
        switchMap(client => this.clientService.updateSessionDuration(client.id)),
        take(1),
      )
      .subscribe();
  }

  // TODO: dodanie przycisku logowania w footerze prawdopodobnie i jak się zaloguje i będzie admin to przeniesienie do panelu admina
  //  lub panelu użytkownika kótry teraz będzie tylko panelem admina

  private initializeClient(): void {
    this.clientService.create({id: -1, feedbacks: [], referrerWebsite: document.referrer})
      .pipe(take(1))
      .subscribe(this.homeDataService.client);
  }
}
