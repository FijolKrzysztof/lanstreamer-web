import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {NotificationPopupDataService} from "../../services/notification-popup-data.service";
import {NgIf} from "@angular/common";

export interface ErrorPopupData {
  message: string;
  description?: string;
}

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf
  ],
})
export class ErrorPopupComponent {

  constructor(
    readonly notificationDataService: NotificationPopupDataService<ErrorPopupData>,
  ) {
  }

  @HostBinding('class')
  private readonly className = 'error-popup-component';

}
