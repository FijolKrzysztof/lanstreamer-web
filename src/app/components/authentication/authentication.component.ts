import {AfterViewInit, Component, NgZone, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {accounts, CredentialResponse} from "google-one-tap";
import {environment} from "../../../environments/environment";
import {catchError, filter, Subject, switchMap, takeUntil} from "rxjs";

declare var google: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements AfterViewInit, OnDestroy {
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
  }

  private subscriptionKiller = new Subject();

  message = 'Authenticate via Google to access Lanstreamer';

  ngAfterViewInit() {
    this.initializeGoogleButton();
  }

  ngOnDestroy() {
    this.subscriptionKiller.next(null);
    this.subscriptionKiller.complete();
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
      this.initializeGoogleButton();
    }
  }

  private login(credential: CredentialResponse) {

    const code = this.router.url.split('/').pop();
    if (!code) {
      this.message = 'Authentication failed! Wrong url.'
      return;
    }

    this.authenticationService.getTokenInfo(credential.credential)
      .pipe(
        filter(data => {
          if (!data?.email) {
            this.message = 'Authentication failed! Cannot access e-mail address.'
          }
          return !!data?.email
        }),
        switchMap(data => this.authenticationService.authenticate(code, data.email!)),
        catchError(err => {
          console.error(err)
          this.message = 'Authentication failed! Cannot access server.'
          return err;
        }),
        takeUntil(this.subscriptionKiller)
      )
      .subscribe(() => this.message = 'Authenticated! You can close the window.')
  }
}
