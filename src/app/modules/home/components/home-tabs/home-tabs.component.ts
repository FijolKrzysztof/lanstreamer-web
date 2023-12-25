import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  ViewChild
} from '@angular/core';
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-home-tabs',
  templateUrl: './home-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatTabsModule
  ],
})
export class HomeTabsComponent implements AfterViewInit {

  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  @HostBinding('class')
  private readonly homeClass = 'home-tabs-component';

  @ViewChild(MatTabGroup)
  private readonly matTabGroup!: MatTabGroup;

  autoTabSwitch = true;
  autoSwitchStep = 1;

  ngAfterViewInit() {
    this.animateTabs();
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

  private animateTabs(): void {
    setTimeout(() => {
      setInterval(() => {
        if (this.autoTabSwitch) {
          const tabGroup = this.matTabGroup;
          const tabCount = tabGroup._tabs.length;
          if ((tabGroup.selectedIndex! + 1) === tabCount) {
            this.autoSwitchStep = -1;
          }
          if (tabGroup.selectedIndex === 0) {
            this.autoSwitchStep = 1;
          }
          this.matTabGroup.selectedIndex = (this.matTabGroup.selectedIndex! + this.autoSwitchStep);
          this.cdr.markForCheck();
        }
      }, 3000)
    }, 6000)
  }
}
