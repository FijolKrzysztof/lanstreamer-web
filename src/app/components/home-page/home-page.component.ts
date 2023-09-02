import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {DownloadType, HomePageService} from "../../services/home-page.service";
import {first, Subject, takeUntil} from "rxjs";
import {MatTabGroup} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {OnLeaveModalComponent} from "./modals/on-leave-modal/on-leave-modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LocalStorageProperties} from "./enums/local-storage-properties";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements AfterViewInit, OnDestroy {

  constructor(
    private readonly homePageService: HomePageService,
    private readonly renderer: Renderer2,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {
    const referrer = document.referrer;
    if (referrer) {
      this.homePageService.sendReferrer(referrer).pipe(first()).subscribe();
    }
  }

  @ViewChild('mainContainer', {read: ElementRef})
  private readonly mainContainer!: ElementRef;

  @ViewChild(MatTabGroup)
  private readonly matTabGroup!: MatTabGroup;

  private readonly subscriptionKiller = new Subject<void>();

  downloadDisabled!: boolean;
  automaticTabSwitch = true;
  automaticSwitchStep = 1;

  get downloaded(): boolean {
    const downloadedItem = localStorage.getItem(LocalStorageProperties.DOWNLOADED);
    return downloadedItem ? JSON.parse(downloadedItem) : false;
  }

  get providedFeedback(): boolean {
    const providedFeedbackItem = localStorage.getItem(LocalStorageProperties.PROVIDED_FEEDBACK);
    return  providedFeedbackItem ? JSON.parse(providedFeedbackItem) : false;
  }

  ngAfterViewInit() {
    this.animateTabs();
    this.showModalOnLeave();
  }

  ngOnDestroy() {
    this.subscriptionKiller.next();
    this.subscriptionKiller.complete();
  }

  download(type: DownloadType) {
    this.downloadDisabled = true;
    document.body.style.cursor = 'wait';

    this.homePageService.getDownloadLink(type)
      .pipe(
        takeUntil(this.subscriptionKiller),
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
            localStorage.setItem(LocalStorageProperties.DOWNLOADED, JSON.stringify(true));
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

  onGiveFeedbackClick() {
    this.openModal('Please, give us your feedback')
  }

  private animateTabs(): void {
    setTimeout(() => {
      setInterval(() => {
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
      }, 3000)
    }, 6000)
  }

  private openModal(message: string): void {
    const dialogRef = this.dialog.open(OnLeaveModalComponent, {
      width: '90vw',
      maxWidth: '400px',
      data: message,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.homePageService.sendFeedback(result).pipe(takeUntil(this.subscriptionKiller)).subscribe();
        this.snackBar.open('Thank you for your feedback!', '', {
          duration: 2000,
          verticalPosition: 'bottom',
        });
        localStorage.setItem(LocalStorageProperties.PROVIDED_FEEDBACK, JSON.stringify(true));
      }
    });
  }

  private showModalOnLeave(): void {
    this.renderer.listen(this.mainContainer.nativeElement, 'mouseleave', () => {
      if (!this.providedFeedback && !this.downloaded) {
        this.openModal("Do you like the app? If not - please tell us why")
      }
    });
  }
}
