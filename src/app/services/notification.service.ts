import {ApplicationRef, Injectable, Injector} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {openNotificationPopup} from "../shared/notification-popup/open-notification-popup";
import {NotificationPopupService} from "../shared/notification-popup/notification-popup.service";
import {TescikComponent} from "../shared/notification-popup/tescik/tescik.component";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly notificationPopupService: NotificationPopupService,
    private readonly injector: Injector,
    private readonly applicationRef: ApplicationRef,
  ) {
  }

  handleError(httpError: HttpErrorResponse, message: string): Observable<never> {
    const error = httpError.error;

    console.error(httpError);

    if (httpError.status === 0) {
      this.showErrorMessage(message, 'Server is unreachable');
    } else if (error.code === 500) { // TODO: tutaj raczej wszystkie kody 500 coś np. 505 itd. powinny iść do tego ifa
      this.showErrorMessage(message);
    } else {
      this.showErrorMessage(message, error.message);
    }

    return throwError(() => httpError);
  }

  private showErrorMessage(message1: string, message2?: string): void {
    // this.openSnackBar(message1,  undefined, 'X');
    // if (message2) {
    //   setTimeout(() => {
    //     this.openSnackBar(message2,  undefined, 'X');
    //   })
    // }
    this.test();
  }

  private test(): void {
    openNotificationPopup(TescikComponent, this.injector, this.applicationRef);
  }

  private openSnackBar(message: string, panelClass?: string, action?: string): void {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: panelClass,
      duration: action ? undefined : 5,
    });
  }
}
