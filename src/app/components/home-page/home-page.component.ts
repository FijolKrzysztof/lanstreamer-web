import {Component, OnDestroy} from '@angular/core';
import {HomePageService} from "./home-page.service";
import {Subject, takeUntil} from "rxjs";

export type DownloadType = 'linux' | 'windows';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy {

  constructor(
    private homePageService: HomePageService,
  ) {
  }

  private _subscriptionKiller = new Subject<void>();

  downloadDisabled!: boolean;

  ngOnDestroy() {
    this._subscriptionKiller.next();
    this._subscriptionKiller.complete();
  }

  download(type: DownloadType) {
    this.downloadDisabled = true;
    document.body.style.cursor = 'wait';

    this.homePageService.getDownloadLink(type)
      .pipe(
        takeUntil(this._subscriptionKiller),
      )
      .subscribe({
        next: (downloadLink: any) => {
          const link = document.createElement('a');
          link.href = downloadLink;
          document.body.appendChild(link);

          link.click();

          document.body.style.cursor = 'auto';
          this.downloadDisabled = false;

          setTimeout(() => {
            document.body.removeChild(link);
          });
        },
        error: (err) => {
          console.error(err);
          this.downloadDisabled = false;
          document.body.style.cursor = 'auto';
        }
      })
  }
}
