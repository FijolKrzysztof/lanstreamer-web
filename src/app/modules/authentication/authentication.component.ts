import {AfterViewInit, ChangeDetectionStrategy, Component, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, take} from "rxjs";
import {accounts, CredentialResponse} from "google-one-tap";
import {environment} from "../../../environments/environment";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {ApiService} from "../../services/api.service";

declare var google: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent implements AfterViewInit {

  constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly apiService: ApiService,
  ) {
  }

  readonly message = new BehaviorSubject<string>('Authenticate via Google to access Lanstreamer');

  ngAfterViewInit() {
    this.initializeGoogleButton();
  }

  private initializeGoogleButton(): void {
    try {
      setTimeout(() => {
        const gAccounts: accounts = google.accounts;

        gAccounts.id.initialize({
          client_id: environment.googleClientId,
          ux_mode: 'popup',
          cancel_on_tap_outside: true,
          callback: (data: CredentialResponse) => {
            this.ngZone.run(() => {
              this.login(data);
            });
          },
        });

        gAccounts.id.renderButton(document.getElementById('google-button') as HTMLElement, {
          size: 'large',
          width: 0,
        });
      }, 100)
    } catch (e) {
      console.error(e);
      this.message.next('Something went wrong while loading the Google login button. Please try to reload the page or come back later.')
    }
  }

  private login(credentialResponse: CredentialResponse) {
    const code = this.router.url.split('/').pop();

    this.apiService.bearerToken = credentialResponse.credential;

    this.userService.login({id: -1, accessCode: code})
      .pipe(
        catchError(err => this.notificationService.handleError(err, 'Authentication failed')),
        take(1),
      )
      .subscribe(() => this.message.next('Authenticated! You can close the window.'));
  }
}
