import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {Portal, PortalModule} from "@angular/cdk/portal";
import {NotificationPopupDataService} from "./services/notification-popup-data.service";
import {Observable} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NotificationPopupConfig} from "./services/notification-popup.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PortalModule, MatButtonModule, MatIconModule, NgClass],
  providers: [NotificationPopupDataService],
})
export class NotificationPopupComponent<T, R = T> {

  constructor(
    private readonly notificationDataService: NotificationPopupDataService<T, R>,
  ) {
  }

  @HostBinding('class')
  private readonly className = 'notification-popup-component'

  portalOutlet!: Portal<any>;
  config: NotificationPopupConfig | undefined; // TODO: kolorowanie na podstawie theme lub przekazywanie koloru zamiast theme

  readonly emitData$: Observable<R> = this.notificationDataService.emitDataSubject.asObservable();
  readonly closePopup$ = this.notificationDataService.closePopupSubject.asObservable();

  set data(value: T) {
    this.notificationDataService.data = value;
  }

  get typeClassObject(): any {
    return {
      info: this.config?.type === 'info',
      warn: this.config?.type === 'warn',
      error: this.config?.type === 'error'
    };
  }

  close(): void {
    this.notificationDataService.closePopup();
  }
}
