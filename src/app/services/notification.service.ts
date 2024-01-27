import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {NotificationPopupService} from "../modules/shared/notification-popup/services/notification-popup.service";
import {
  ErrorPopupComponent,
  ErrorPopupData
} from "../modules/shared/notification-popup/components/error-popup/error-popup.component";
import {InfoPopupComponent} from "../modules/shared/notification-popup/components/info-popup/info-popup.component";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(
    private readonly notificationPopupService: NotificationPopupService<ErrorPopupData>,
  ) {
  }

  handleAndShowError(httpError: HttpErrorResponse, message: string): Observable<never> {
    const error = httpError.error;

    console.error(httpError);

    if (httpError.status === 0) {
      this.showErrorMessage({message, description: 'Server is not responding'});
    } else if (httpError.status === 404) {
      this.showErrorMessage({message, description: error?.message ?? 'Resource not found'});
    } else if (httpError.status === 500) {
      this.showErrorMessage({message});
    } else {
      this.showErrorMessage({message, description: error?.message});
    }

    return throwError(() => httpError);
  }

  showInfoMessage(message: string, autoCloseAfter?: number): void {
    this.notificationPopupService.openNotificationPopup(InfoPopupComponent, {message}, {type: 'info', autoCloseAfter}).subscribe();
  }

  private showErrorMessage(data: ErrorPopupData): void {
    this.notificationPopupService.openNotificationPopup(ErrorPopupComponent, data, {type: 'error'}).subscribe();
  }
}
