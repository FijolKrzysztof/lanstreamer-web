import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {BehaviorSubject, catchError, switchMap, take, tap} from "rxjs";
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

    this.homeDataService.client
      .pipe(
        tap(() => console.log('hello')),
        take(1),
        switchMap(client => this.clientService.downloadApp(client?.id!, os)),
        catchError(err => {
          this.refreshState();
          return this.notificationService.handleAndShowError(err, 'Cannot download file!');
        }),
      )
      .subscribe((blob: Blob) => {
        console.log('blob', blob)
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lanstreamer.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.refreshState();
      });
  }

  private refreshState(): void {
    this.downloadDisabledSubject.next(false);
    document.body.style.cursor = 'auto';
  }
}
