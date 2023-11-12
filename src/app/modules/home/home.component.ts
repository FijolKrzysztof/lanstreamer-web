import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {HomeDataService} from "./home-data.service";
import {take} from "rxjs";
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
  ) {
    this.initializeClient();
  }

  @HostBinding('class')
  private readonly hostClass = 'home-page-component';

  private initializeClient(): void {
    this.clientService.create({id: -1, feedbacks: [], referrerWebsite: document.referrer}).pipe(take(1)).subscribe();
  }
}
