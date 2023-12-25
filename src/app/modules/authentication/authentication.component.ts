import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  NgZone,
  Output
} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, take} from "rxjs";
import {accounts, CredentialResponse} from "google-one-tap";
import {environment} from "../../../environments/environment";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {ApiService} from "../../services/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginResponse} from "../../data/dto/responses/login-response";
import {AsyncPipe} from "@angular/common";

declare var google: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe
  ],
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

  @HostBinding('class')
  private readonly className = 'authentication-component';

  @Output()
  readonly authenticated = new EventEmitter<LoginResponse>();

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
      this.notificationService.handleAndShowError(e as HttpErrorResponse, 'Something went wrong while loading the Google login button. Please reload the page or come back later.');
    }
  }

  private login(credentialResponse: CredentialResponse) {
    const code = this.router.url.split('/').pop();

    this.apiService.bearerToken = credentialResponse.credential;

    this.userService.login({id: -1, accessCode: code})
      .pipe(
        catchError(err => this.notificationService.handleAndShowError(err, 'Authentication failed!')),
        take(1),
      )
      .subscribe(response => {
        this.message.next('Authenticated! You can close the window.');
        this.authenticated.emit(response);
      });
  }
}
