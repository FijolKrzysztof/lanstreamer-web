import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {catchError, switchMap, take} from "rxjs";
import {ClientService} from "../../../../services/client.service";
import {HomeDataService} from "../../services/home-data.service";
import {OperatingSystem} from "../../../../data/models/enums/operating-system";
import {NotificationService} from "../../../../services/notification.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-home-downloads',
  templateUrl: './home-downloads.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule
  ],
})
export class HomeDownloadsComponent {

  constructor(
    private readonly clientService: ClientService,
    private readonly homeDataService: HomeDataService,
    private readonly notificationService: NotificationService,
  ) {
  }

  @HostBinding('class')
  private readonly className = 'home-downloads-component';

  readonly operatingSystem = OperatingSystem;

  downloadDisabled!: boolean;

  download(os: OperatingSystem) {
    this.downloadDisabled = true;
    document.body.style.cursor = 'wait';

    this.homeDataService.client
      .pipe(
        take(1),
        switchMap(client => this.clientService.downloadApp(client?.id!, os)),
        catchError(err => {
          this.refreshState();
          return this.notificationService.handleAndShowError(err, 'Cannot download file!');
        }),
      )
      .subscribe(() => {
        this.refreshState();
      });
  }

  private refreshState(): void {
    this.downloadDisabled = false;
    document.body.style.cursor = 'auto';
  }
}
