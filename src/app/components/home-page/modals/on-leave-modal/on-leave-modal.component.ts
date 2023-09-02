import {Component, HostBinding, Inject, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-on-leave-modal',
  templateUrl: './on-leave-modal.component.html',
  styleUrls: ['on-leave-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OnLeaveModalComponent {

  constructor(
    public dialogRef: MatDialogRef<OnLeaveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
  ) {}

  @HostBinding('class')
  private readonly hostClass = 'on-leave-modal';

  readonly formControl = new FormControl();

  onSubmit(): void {
    this.dialogRef.close(true);
  }
}
