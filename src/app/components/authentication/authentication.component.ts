import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {AuthenticationService} from "./authentication.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private authenticationService: AuthenticationService,
  ) {
  }

  message = 'Authenticate via Google to access Lanstreamer';

  login(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response) => {
        const code = this.router.url.split('/').pop();
        if (!code) {
          this.authenticationFailed();
          return;
        }
        this.authenticationService.authenticate(code, response.email)
          .subscribe(
            () => this.authenticationSucceeded(),
            () => this.authenticationFailed()
          );
      })
      .catch(() => this.authenticationFailed());
  }

  private authenticationSucceeded(): void {
    this.message = 'Authenticated! You can close the window.'
  }

  private authenticationFailed(): void {
    this.message = 'Authentication failed. Please try again.';
  }
}
