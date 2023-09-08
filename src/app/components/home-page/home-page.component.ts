import {AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {DownloadType, HomePageService} from "../../services/home-page.service";
import {first, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {OnLeaveModalComponent} from "./modals/on-leave-modal/on-leave-modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LocalStorageProperties} from "./enums/local-storage-properties";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
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

  @HostBinding('class')
  private readonly hostClass = 'home-page-component';

  @ViewChild('mainContainer', {read: ElementRef})
  private readonly mainContainer!: ElementRef;

  private readonly subscriptionKiller = new Subject<void>();

  downloadDisabled!: boolean;

  get downloaded(): boolean {
    const downloadedItem = localStorage.getItem(LocalStorageProperties.DOWNLOADED);
    return downloadedItem ? JSON.parse(downloadedItem) : false;
  }

  get providedFeedback(): boolean {
    const providedFeedbackItem = localStorage.getItem(LocalStorageProperties.PROVIDED_FEEDBACK);
    return  providedFeedbackItem ? JSON.parse(providedFeedbackItem) : false;
  }

  ngAfterViewInit() {
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
