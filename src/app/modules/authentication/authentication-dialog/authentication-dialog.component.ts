import {ChangeDetectionStrategy, Component, HostBinding, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-authentication-dialog',
  templateUrl: './authentication-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AuthenticationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string,
  ) {
  }

  @HostBinding('class')
  private readonly className = 'authentication-dialog-component';

  onAuthentication(): void {
    this.dialogRef.close(true);
  }
}
