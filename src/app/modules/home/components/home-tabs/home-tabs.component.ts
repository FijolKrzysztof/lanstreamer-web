import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-home-tabs',
  templateUrl: './home-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTabsComponent implements AfterViewInit {

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
        }
      }, 3000)
    }, 6000)
  }
}
