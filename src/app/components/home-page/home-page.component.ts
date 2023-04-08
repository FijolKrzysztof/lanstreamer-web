import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {HomePageService} from "./home-page.service";
import {Subject, takeUntil} from "rxjs";
import {MatTabGroup} from "@angular/material/tabs";

export type DownloadType = 'linux' | 'windows';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit, OnDestroy {

  constructor(
    private homePageService: HomePageService,
  ) {
  }

  @ViewChild(MatTabGroup) matTabGroup!: MatTabGroup;

  private _subscriptionKiller = new Subject<void>();

  downloadDisabled!: boolean;
  automaticTabSwitch = true;
  automaticSwitchStep = 1;

  ngAfterViewInit() {
    setTimeout(() => {
      // setInterval(() => {
        if (this.automaticTabSwitch) {
          const tabGroup = this.matTabGroup;
          const tabCount = tabGroup._tabs.length;
          if ((tabGroup.selectedIndex! + 1) === tabCount) {
            this.automaticSwitchStep = -1;
          }
          if (tabGroup.selectedIndex === 0) {
            this.automaticSwitchStep = 1;
          }
          this.matTabGroup.selectedIndex = (this.matTabGroup.selectedIndex! + this.automaticSwitchStep);
        }
      // }, 3000)
    }, 6000)
  }

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

  onTabChange() {
    const videoPlayers = document.getElementsByClassName('presentation-video');
    for (const videoPlayerKey in videoPlayers) {
      const videoPlayer: HTMLVideoElement = videoPlayers[videoPlayerKey] as HTMLVideoElement;
      if (typeof videoPlayer.play !== 'undefined') {
        videoPlayer.play().catch(err => console.error(err));
      }
    }
  }
}
