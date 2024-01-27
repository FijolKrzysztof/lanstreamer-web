import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationPopupDataService} from "../../services/notification-popup-data.service";

interface InfoPopupData {
  message: string;
}

@Component({
  selector: 'app-info-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPopupComponent {
  constructor(
    readonly notificationDataService: NotificationPopupDataService<InfoPopupData>,
  ) {
  }

  @HostBinding('class')
  private readonly className = 'info-popup-component';
}
