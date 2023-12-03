import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {catchError, map, switchMap, take} from "rxjs";
import {ClientService} from "../../../../services/client.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HomeInputDialogComponent} from "../home-input-dialog/home-input-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {HomeDataService} from "../../services/home-data.service";
import {
  AuthenticationDialogComponent
} from "../../../authentication/authentication-dialog/authentication-dialog.component";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../services/notification.service";
import {LoginResponse} from "../../../../data/dto/responses/login-response";

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFooterComponent {

  constructor(
    private readonly clientService: ClientService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly homeDataService: HomeDataService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
  ) {
  }

  @HostBinding('class')
  private readonly className = 'home-footer-component'

  onLogin(): void {
    const dialogRef = this.dialog.open(AuthenticationDialogComponent);

    dialogRef.afterClosed().subscribe((response: LoginResponse) => {
      if (response.roles.includes('Admin')) {
        this.router.navigate(['/user']).then();
      }
    })
  }

  onGiveFeedback() {
    const dialogRef = this.dialog.open(HomeInputDialogComponent, {
      width: '90vw',
      maxWidth: '400px',
      data: 'Please, give us your feedback',
    });

    dialogRef.afterClosed().subscribe((message) => {
      if (message) {
        this.homeDataService.client
          .pipe(
            take(1),
            map(client => {
              client.feedbacks.push(message);
              return client;
            }),
            switchMap(client => this.clientService.update(client!)),
            catchError(err => this.notificationService.handleAndShowError(err, 'Something went wrong!')),
          )
          .subscribe(() => {
            this.snackBar.open('Thank you for your feedback!', '', {
              duration: 2000,
              verticalPosition: 'bottom',
            });
          });
      }
    });
  }
}
