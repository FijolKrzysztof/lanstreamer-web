import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {NotificationPopupDataService} from "../../services/notification-popup-data.service";

export interface ErrorPopupData {
  message: string;
  description?: string;
}

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPopupComponent {

  constructor(
    readonly notificationDataService: NotificationPopupDataService<ErrorPopupData>,
  ) {
  }

  @HostBinding('class')
  private readonly className = 'error-popup-component';

}
