import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(
    private readonly snackBar: MatSnackBar,
  ) {
  }

  handleError(httpError: HttpErrorResponse, message: string): Observable<never> {
    const error = httpError.error;

    console.error(httpError);

    if (error.code === 500) { // TODO: tutaj raczej wszystkie kody 500 coś np. 505 itd. powinny iść do tego ifa
      this.showErrorMessage(message);
    } else {
      this.showErrorMessage(`${message} : ${error.message}`)
    }

    return throwError(() => httpError);
  }

  private showErrorMessage(message: string): void {
    this.openSnackBar(message, 'X', 'snackbar-error');
  }

  private openSnackBar(message: string, panelClass: string, action?: string): void {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: panelClass,
    });
  }
}
