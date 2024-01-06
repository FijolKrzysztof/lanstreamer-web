import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {BehaviorSubject, map, take} from "rxjs";
import {ClientService} from "../../../../services/client.service";
import {HomeDataService} from "../../services/home-data.service";
import {OperatingSystem} from "../../../../data/models/enums/operating-system";
import {NotificationService} from "../../../../services/notification.service";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-home-downloads',
  templateUrl: './home-downloads.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    AsyncPipe
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
  readonly downloadDisabledSubject = new BehaviorSubject<boolean>(false);

  download(os: OperatingSystem) {
    this.downloadDisabledSubject.next(true);
    document.body.style.cursor = 'wait';

    this.homeDataService.client.pipe(
      take(1),
      map(client => {
        const url = this.clientService.getDownloadLink(client?.id!, os); // TODO: dodać sprawdzenie czy url jest valid
        console.log('url', url)
        const link = document.createElement('a');
        link.href = url;
        link.download = 'lanstreamer.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    ).subscribe({
      complete: () => this.refreshState(),
      error: err => {
        this.refreshState();
        this.notificationService.handleAndShowError(err, 'Cannot download file!');
      }
    });
  }

  private refreshState(): void {
    this.downloadDisabledSubject.next(false);
    document.body.style.cursor = 'auto';
  }
}
