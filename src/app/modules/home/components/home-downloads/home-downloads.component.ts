import {ChangeDetectionStrategy, Component} from '@angular/core';
import {catchError, switchMap, take} from "rxjs";
import {ClientService} from "../../../../services/client.service";
import {HomeDataService} from "../../services/home-data.service";
import {OperatingSystem} from "../../../../data/models/enums/operating-system";

@Component({
  selector: 'app-home-downloads',
  templateUrl: './home-downloads.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDownloadsComponent {

  constructor(
    private readonly clientService: ClientService,
    private readonly homeDataService: HomeDataService,
  ) {
  }

  readonly operatingSystem = OperatingSystem;

  downloadDisabled!: boolean;

  download(os: OperatingSystem) {
    this.downloadDisabled = true;
    document.body.style.cursor = 'wait';

    this.homeDataService.client.pipe(
      take(1),
      switchMap(client => this.clientService.downloadApp(client?.id!, os)),
      catchError(err => err), // TODO: obsługa błedów
    )
      .subscribe(() => {
        this.downloadDisabled = false; // TODO : uwspólnienie przywracania poprzedniego stanu dla error i subscribe
      });

    // this.homePageService.getDownloadLink(type)
    //   .pipe(
    //     takeUntil(this.subscriptionKiller),
    //   )
    //   .subscribe({
    //     next: (downloadLink: any) => {
    //       const link = document.createElement('a');
    //       link.href = downloadLink;
    //       document.body.appendChild(link);
    //
    //       link.click();
    //
    //       document.body.style.cursor = 'auto';
    //       this.downloadDisabled = false;
    //
    //       setTimeout(() => {
    //         document.body.removeChild(link);
    //         localStorage.setItem(LocalStorageProperties.DOWNLOADED, JSON.stringify(true));
    //       });
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       this.downloadDisabled = false;
    //       document.body.style.cursor = 'auto';
    //     }
    //   })
  }

}
